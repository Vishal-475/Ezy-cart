document.addEventListener("DOMContentLoaded", function () {
    const attendanceForm = document.getElementById("take-attendance-form");
    const attendanceTable = document.getElementById("attendance-table").querySelector("tbody");
    const attendanceRecordsTable = document.getElementById("attendance-records-table").querySelector("tbody");
  
    let workers = [
      { id: 1, name: "VISHAL" },
      { id: 2, name: "MAGULAVARTHAN" },
    ];
  
    let attendanceRecords = [];
  
    // Render Workers in Attendance Table
    function renderAttendanceTable() {
      attendanceTable.innerHTML = "";
      workers.forEach((worker) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${worker.id}</td>
          <td>${worker.name}</td>
          <td>
            <select id="status-${worker.id}">
              <option value="Nill">Nill</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </td>
        `;
        attendanceTable.appendChild(row);
      });
    }
  
    // Submit Attendance Form
    attendanceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const date = document.getElementById("attendance-date").value;
  
      workers.forEach((worker) => {
        const status = document.getElementById(`status-${worker.id}`).value;
        if (status !== "Nill") {
          attendanceRecords.push({
            date: date,
            workerId: worker.id,
            name: worker.name,
            status: status,
          });
        }
      });
  
      renderAttendanceRecords();
      attendanceForm.reset();
      renderAttendanceTable(); // Reset status to "Nill"
    });
  
    // Render Attendance Records
    function renderAttendanceRecords() {
      attendanceRecordsTable.innerHTML = "";
      attendanceRecords.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${record.date}</td>
          <td>${record.workerId}</td>
          <td>${record.name}</td>
          <td>${record.status}</td>
        `;
        attendanceRecordsTable.appendChild(row);
      });
    }
  
    // Initial Render
    renderAttendanceTable();
  });