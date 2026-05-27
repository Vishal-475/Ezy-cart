import { auth, db, doc, setDoc, getDoc, onAuthStateChanged } from './firebase-config.js';
import { showToast } from './toast.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save to localStorage and trigger cloud sync
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Sync to cloud if user is logged in
    const user = auth.currentUser;
    if (user) {
        setDoc(doc(db, "carts", user.uid), {
            items: cart,
            updatedAt: new Date().toISOString()
        }).catch(err => console.error("Error syncing cart to Firestore:", err));
    }
}

// Merge cloud and local carts
async function mergeCloudCart(user) {
    try {
        const cartRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(cartRef);
        
        let cloudItems = [];
        if (docSnap.exists()) {
            cloudItems = docSnap.data().items || [];
        }
        
        let mergedCart = [...cloudItems];
        cart.forEach(localItem => {
            const matchIndex = mergedCart.findIndex(cloudItem => cloudItem.name === localItem.name);
            if (matchIndex !== -1) {
                mergedCart[matchIndex].quantity = Math.max(mergedCart[matchIndex].quantity, localItem.quantity);
            } else {
                mergedCart.push(localItem);
            }
        });
        
        cart = mergedCart;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        await setDoc(cartRef, {
            items: cart,
            updatedAt: new Date().toISOString()
        });
        
        window.dispatchEvent(new Event('cartSynced'));
    } catch (err) {
        console.error("Error merging cloud cart:", err);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        mergeCloudCart(user);
    }
});

// Add item to cart
export function addToCart(productName, productPrice, quantity = 1) {
    if (isNaN(productPrice) || productPrice <= 0) {
        showToast("Invalid product price!", "error");
        return;
    }
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }
    saveCart();
    showToast(`${productName} added to cart!`, "success");
}

// Remove item
export function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
}

export function adjustQuantity(productName, adjustment) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        if (cart[productIndex].quantity + adjustment > 0) {
            cart[productIndex].quantity += adjustment;
            saveCart();
        } else {
            showToast('Quantity cannot be less than 1', 'warning');
        }
    }
}

// Clear cart (local + cloud)
export function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Also clear from Firestore
    const user = auth.currentUser;
    if (user) {
        setDoc(doc(db, "carts", user.uid), {
            items: [],
            updatedAt: new Date().toISOString()
        }).catch(err => console.error("Error clearing cloud cart:", err));
    }
    
    // Notify other components
    window.dispatchEvent(new Event('cartSynced'));
}

// Get cart items
export function getCart() {
    return cart;
}

// Get total items count
export function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get total price
export function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update UI badge
export function updateCartBadge() {
    const badge = document.getElementById('cartCount') || document.getElementById('cart-count');
    if (badge) {
        badge.textContent = getCartCount();
    }
}

// Initialization for badge
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Attach globally for inline handlers in HTML until full migration
window.addToCart = addToCart;
