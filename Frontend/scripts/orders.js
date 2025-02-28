document.addEventListener("DOMContentLoaded", function () {
    const orders = [
      { id: 101, customer: "VISHAL", total: 50.0, date: "2023-10-01", status: "Delivered" },
      { id: 102, customer: "SRI CHARAN", total: 30.0, date: "2023-09-15", status: "Pending" },
      { id: 103, customer: "MAGULAVARTHAN", total: 20.0, date: "2022-12-25", status: "Delivered" },
    ];
  
    const filterSelect = document.getElementById("filter-orders");
    filterSelect.addEventListener("change", function () {
      renderOrders(filterSelect.value);
    });
  
    // Render Orders Table
    function renderOrders(filter) {
      const tbody = document.querySelector("#orders-table tbody");
      tbody.innerHTML = "";
  
      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.date);
        const now = new Date();
        switch (filter) {
          case "yearly":
            return orderDate.getFullYear() === now.getFullYear();
          case "monthly":
            return (
              orderDate.getFullYear() === now.getFullYear() &&
              orderDate.getMonth() === now.getMonth()
            );
          case "weekly":
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return orderDate >= oneWeekAgo && orderDate <= now;
          default:
            return true;
        }
      });
  
      filteredOrders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>$${order.total.toFixed(2)}</td>
          <td>${order.date}</td>
          <td>${order.status}</td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Initial Render
    renderOrders("all");
  });