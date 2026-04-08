// ============================================================
// routes/usuarios.routes.js — Definición de rutas de /usuarios
// ============================================================
//
// El ROUTER conecta una URL + método HTTP con una función del controlador.
//
// Flujo de una petición:
//   Cliente → index.js → router → controlador → modelo → base de datos
//
// Aquí solo definimos el "mapa" de rutas.
// Toda la lógica está en el controlador.

const express = require('express');
const router = express.Router();
const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
} = require('../controllers/usuarios.controller');

// Estas rutas son relativas al prefijo con el que se montó el router en index.js.
// Si en index.js se usa app.use('/usuarios', router), entonces:
//   router.get('/')     → GET /usuarios
//   router.get('/:id')  → GET /usuarios/:id
//   etc.

router.get('/', listar);        // GET    /usuarios
router.get('/:id', obtener);    // GET    /usuarios/:id
router.post('/', crear);        // POST   /usuarios
router.put('/:id', actualizar); // PUT    /usuarios/:id
router.delete('/:id', eliminar);// DELETE /usuarios/:id

module.exports = router;
