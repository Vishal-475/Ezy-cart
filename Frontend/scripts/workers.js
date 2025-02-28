document.addEventListener("DOMContentLoaded", function () {
    let workers = []; // Store workers data
  
    // Add Worker Form
    const addWorkerForm = document.getElementById("add-worker-form");
    addWorkerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("worker-name").value;
      const role = document.getElementById("worker-role").value;
      const salary = parseFloat(document.getElementById("worker-salary").value);
  
      if (name && role && salary) {
        const newWorker = {
          id: workers.length + 1,
          name: name,
          role: role,
          salary: salary,
        };
        workers.push(newWorker);
        renderWorkers();
        addWorkerForm.reset();
      }
    });
  
    // Render Workers Table
    function renderWorkers() {
      const tbody = document.querySelector("#workers-table tbody");
      tbody.innerHTML = "";
  
      workers.forEach((worker, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${worker.id}</td>
          <td>${worker.name}</td>
          <td>${worker.role}</td>
          <td>$${worker.salary.toFixed(2)}</td>
          <td>
            <button onclick="editWorker(${index})">Edit</button>
            <button onclick="deleteWorker(${index})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Edit Worker
    window.editWorker = function (index) {
      const worker = workers[index];
      const newName = prompt("Enter new name:", worker.name);
      const newRole = prompt("Enter new role:", worker.role);
      const newSalary = parseFloat(prompt("Enter new salary:", worker.salary));
  
      if (newName && newRole && !isNaN(newSalary)) {
        workers[index] = {
          ...worker,
          name: newName,
          role: newRole,
          salary: newSalary,
        };
        renderWorkers();
      }
    };
  
    // Delete Worker
    window.deleteWorker = function (index) {
      if (confirm("Are you sure you want to delete this worker?")) {
        workers.splice(index, 1);
        renderWorkers();
      }
    };
  
    // Initial Render
    renderWorkers();
  });