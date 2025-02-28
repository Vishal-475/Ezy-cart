// Add interactivity for the homepage (e.g., add to cart)
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".product button");
  
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        alert("Product added to cart!");
      });
    });
  });