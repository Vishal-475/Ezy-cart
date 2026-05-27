// This module handles cart state locally and provides interface for cloud sync later
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Add item to cart
export function addToCart(productName, productPrice, quantity = 1) {
    if (isNaN(productPrice) || productPrice <= 0) {
        alert("Invalid product price!");
        return;
    }
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }
    saveCart();
    alert(`${productName} added to cart!`);
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
            alert('Quantity cannot be less than 1');
        }
    }
}

// Clear cart
export function clearCart() {
    cart = [];
    saveCart();
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
