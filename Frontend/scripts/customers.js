document.addEventListener("DOMContentLoaded", function () {
    let customers = []; // Store customers data
  
    // Add Customer Form
    const addCustomerForm = document.getElementById("add-customer-form");
    addCustomerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("customer-name").value;
      const email = document.getElementById("customer-email").value;
      const phone = document.getElementById("customer-phone").value;
  
      if (name && email && phone) {
        const newCustomer = {
          id: customers.length + 1,
          name: name,
          email: email,
          phone: phone,
        };
        customers.push(newCustomer);
        renderCustomers();
        addCustomerForm.reset();
      }
    });
  
    // Render Customers Table
    function renderCustomers() {
      const tbody = document.querySelector("#customers-table tbody");
      tbody.innerHTML = "";
  
      customers.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>
            <button onclick="editCustomer(${index})">Edit</button>
            <button onclick="deleteCustomer(${index})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Edit Customer
    window.editCustomer = function (index) {
      const customer = customers[index];
      const newName = prompt("Enter new name:", customer.name);
      const newEmail = prompt("Enter new email:", customer.email);
      const newPhone = prompt("Enter new phone:", customer.phone);
  
      if (newName && newEmail && newPhone) {
        customers[index] = {
          ...customer,
          name: newName,
          email: newEmail,
          phone: newPhone,
        };
        renderCustomers();
      }
    };
  
    // Delete Customer
    window.deleteCustomer = function (index) {
      if (confirm("Are you sure you want to delete this customer?")) {
        customers.splice(index, 1);
        renderCustomers();
      }
    };
  
    // Initial Render
    renderCustomers();
  });