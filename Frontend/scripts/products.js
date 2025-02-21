document.addEventListener("DOMContentLoaded", function () {
    let products = []; // Store products data
  
    // Add Product Form
    const addProductForm = document.getElementById("add-product-form");
    addProductForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("product-name").value;
      const price = parseFloat(document.getElementById("product-price").value);
      const stock = parseInt(document.getElementById("product-stock").value);
  
      if (name && price && stock) {
        const newProduct = {
          id: products.length + 1,
          name: name,
          price: price,
          stock: stock,
        };
        products.push(newProduct);
        renderProducts();
        addProductForm.reset();
      }
    });
  
    // Render Products Table
    function renderProducts() {
      const tbody = document.querySelector("#products-table tbody");
      tbody.innerHTML = "";
  
      products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.stock}</td>
          <td>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Edit Product
    window.editProduct = function (index) {
      const product = products[index];
      const newName = prompt("Enter new name:", product.name);
      const newPrice = parseFloat(prompt("Enter new price:", product.price));
      const newStock = parseInt(prompt("Enter new stock:", product.stock));
  
      if (newName && !isNaN(newPrice) && !isNaN(newStock)) {
        products[index] = {
          ...product,
          name: newName,
          price: newPrice,
          stock: newStock,
        };
        renderProducts();
      }
    };
  
    // Delete Product
    window.deleteProduct = function (index) {
      if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        renderProducts();
      }
    };
  
    // Initial Render
    renderProducts();
  });