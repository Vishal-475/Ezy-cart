// scripts/wishlist-manager.js

let currentUserId = 'guest';

export function setWishlistUser(userId) {
    currentUserId = userId || 'guest';
    updateWishlistBadge();
}

function getStorageKey() {
    return `ezycart_wishlist_${currentUserId}`;
}

export function getWishlist() {
    const list = localStorage.getItem(getStorageKey());
    return list ? JSON.parse(list) : [];
}

export function saveWishlist(list) {
    localStorage.setItem(getStorageKey(), JSON.stringify(list));
    updateWishlistBadge();
}

export function isInWishlist(productId) {
    const list = getWishlist();
    return list.some(item => item.id === productId);
}

export function toggleWishlist(product) {
    let list = getWishlist();
    const index = list.findIndex(item => item.id === product.id);
    
    if (index !== -1) {
        // Remove from wishlist
        list.splice(index, 1);
        saveWishlist(list);
        return false; // Removed
    } else {
        // Add to wishlist
        list.push(product);
        saveWishlist(list);
        return true; // Added
    }
}

export function updateWishlistBadge() {
    const list = getWishlist();
    const countEl = document.getElementById('wishlist-count');
    if (countEl) {
        countEl.textContent = list.length;
        if (list.length > 0) {
            countEl.style.display = 'inline-flex';
        } else {
            countEl.style.display = 'none';
        }
    }
}

// Auto-init on load
document.addEventListener('DOMContentLoaded', updateWishlistBadge);
