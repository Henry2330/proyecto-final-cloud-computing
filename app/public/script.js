const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentsTable');

async function fetchStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();
  tableBody.innerHTML = '';
  data.data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.nombre}</td>
      <td>${student.edad}</td>
      <td>${student.carrera}</td>
      <td>
        <button onclick="deleteStudent(${student.id})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const carrera = document.getElementById('carrera').value;

  await fetch('/api/students', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre, edad, carrera})
  });

  form.reset();
  fetchStudents();
});

async function deleteStudent(id) {
  await fetch(`/api/students/${id}`, { method: 'DELETE' });
  fetchStudents();
}

// Inicializar tabla
fetchStudents();
