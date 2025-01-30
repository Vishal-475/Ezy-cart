// Load cart from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add items to the cart
function addToCart(productName, productPrice) {
    if (isNaN(productPrice) || productPrice <= 0) {
        alert("Invalid product price!");
        return;
    }

    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // If the product already exists in the cart, increase the quantity
        cart[productIndex].quantity += 1;
    } else {
        // If it's a new product, add it to the cart with quantity 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    saveCart(); // Save updated cart to localStorage
    renderCartItems(); // Update cart display immediately
    showNotification(`${productName} added to cart!`);
}

// Function to render cart items in a table format
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = ''; // Clear current items display
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
        totalPriceElement.textContent = '₹0.00';
        return;
    }

    const fragment = document.createDocumentFragment();
    cart.forEach(item => {
        const subtotal = item.quantity * item.price;
        totalPrice += subtotal;

        // Create a row for each cart item
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${subtotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        fragment.appendChild(row);
    });

    cartItemsContainer.appendChild(fragment);
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
}

// Function to remove items from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCartItems();
    showNotification(`${productName} removed from cart.`);
}

// Function to toggle QR code display for UPI
function toggleQRCode() {
    const paymentMethod = document.getElementById('payment').value;
    const qrCodeSection = document.getElementById('qr-code-section');

    if (!qrCodeSection) return;

    qrCodeSection.style.display = paymentMethod === 'UPI' ? 'block' : 'none';

    if (paymentMethod === 'Card') {
        alert('Please enter your card details.');
    }
}

// Function to update and display invoice
function displayInvoice() {
    const invoiceSection = document.getElementById('invoice');
    const invoiceDetails = document.getElementById('invoice-details');
    const totalAmountElement = document.getElementById('total-amount');

    if (!invoiceSection || !invoiceDetails || !totalAmountElement) return;

    let totalAmount = 0;
    invoiceDetails.innerHTML = ''; // Clear any previous invoice details

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        const itemRow = document.createElement('p');
        itemRow.textContent = `${item.quantity} x ${item.name} - ₹${subtotal.toFixed(2)}`;
        invoiceDetails.appendChild(itemRow);
    });

    totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
    invoiceSection.style.display = 'block'; // Show the invoice section
}

// Function to handle order placement
function placeOrder(event) {
    event.preventDefault(); // Prevent form submission

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Display the invoice before placing the order
    displayInvoice();

    // Show confirmation before actually placing the order
    const confirmed = confirm("Order placed successfully! Do you want to proceed?");
    if (confirmed) {
        // Clear cart data
        cart = [];
        localStorage.removeItem('cart');
        renderCartItems(); // Refresh cart display
        alert("Thank you for your purchase!");
    }
}

// Function to handle checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
    window.location.href = 'checkout.html';
}

// Function to handle logout and redirect to the homepage
function logout() {
    window.location.href = "index.html"; // Replace "index.html" with the actual path to your homepage
}

// Function to show notifications dynamically
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Ensure cart contents are displayed on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); // Display cart items initially
    if (cart.length > 0) {
        displayInvoice(); // Show invoice if cart has items
    }

    // Attach toggleQRCode to payment dropdown change
    const paymentElement = document.getElementById('payment');
    if (paymentElement) {
        paymentElement.addEventListener('change', toggleQRCode);
    }
});




