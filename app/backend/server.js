const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const path = require('path');

// Servir archivos estáticos de la carpeta "public"
//app.use(express.static(path.join(__dirname, '')));


// Middleware de seguridad
app.use(helmet());

// Logger
app.use(morgan('combined'));

// Parse JSON
app.use(express.json());


// Datos en memoria (CRUD)

let students = [];
let nextId = 1;

// Listar todos los estudiantes
app.get('/api/students', (req, res) => {
  res.json({
    success: true,
    data: students
  });
});

// Obtener estudiante por id
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  }
  res.json({ success: true, data: student });
});

// Crear un nuevo estudiante
app.post('/api/students', (req, res) => {
  const { nombre, edad, carrera } = req.body;
  if (!nombre || !edad || !carrera) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
  }
  const newStudent = { id: nextId++, nombre, edad, carrera };
  students.push(newStudent);
  res.status(201).json({ success: true, data: newStudent });
});

// Actualizar estudiante
app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  }
  const { nombre, edad, carrera } = req.body;
  if (nombre) student.nombre = nombre;
  if (edad) student.edad = edad;
  if (carrera) student.carrera = carrera;
  res.json({ success: true, data: student });
});

// Eliminar estudiante
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  }
  const deletedStudent = students.splice(index, 1);
  res.json({ success: true, data: deletedStudent[0] });
});

// =======================
// Rutas existentes
// =======================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '¡Aplicación CI/CD en AWS funcionando correctamente!',
    data: {
      version: '1.0.0',
      environment: ENV,
      timestamp: new Date().toISOString(),
      hostname: require('os').hostname()
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'Proyecto Final CI/CD',
    technology: 'Node.js + Express',
    cloud: 'AWS ECS Fargate',
    cicd: 'GitHub Actions',
    infrastructure: 'Terraform'
  });
});

// Ruta de error para testing
app.get('/error', (req, res) => {
  throw new Error('Error de prueba');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Ambiente: ${ENV}`);
  console.log(`Iniciado: ${new Date().toISOString()}`);
});
