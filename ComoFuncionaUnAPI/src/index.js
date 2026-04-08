// ============================================================
// index.js — Punto de entrada de la API
// ============================================================
//
// Este archivo:
//   1. Crea la aplicación Express.
//   2. Configura middlewares globales (cors, json).
//   3. Monta los routers en sus rutas base.
//   4. Conecta con la base de datos y sincroniza los modelos.
//   5. Enciende el servidor.
//
// ORDEN DE LECTURA RECOMENDADO para entender la arquitectura:
//   index.js → routes/ → controllers/ → models/ → db.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
require('./models/usuario.model'); // Registra el modelo para que sequelize.sync() lo conozca

const usuariosRouter = require('./routes/usuarios.routes');

const app = express();

// --- Middlewares globales ---

// cors() permite que otros orígenes (ej. el frontend en localhost:3000) llamen a esta API.
app.use(cors());

// express.json() parsea el cuerpo de las peticiones con Content-Type: application/json.
// Sin esto, req.body estaría vacío.
app.use(express.json());

// --- Rutas ---

// Cualquier petición que llegue a /usuarios se pasa al usuariosRouter.
app.use('/usuarios', usuariosRouter);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando ✓', rutas: ['/usuarios'] });
});

// --- Iniciar servidor ---

const PORT = 4000;

// sequelize.sync() crea las tablas en la BD si no existen.
// { alter: true } actualiza las columnas si el modelo cambió (solo en desarrollo).
sequelize
  .sync({ alter: true })
  //.sync({ force: true })
  .then(() => {
    console.log('Base de datos conectada y tablas sincronizadas.');
    app.listen(PORT, () => {
      console.log(`ComoFuncionaUnAPI corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1);
  });
