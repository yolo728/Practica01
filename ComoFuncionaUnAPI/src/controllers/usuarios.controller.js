// ============================================================
// controllers/usuarios.controller.js — Lógica de cada endpoint
// ============================================================
//
// El CONTROLADOR contiene las funciones que se ejecutan cuando
// llega una petición HTTP. Cada función corresponde a una operación
// del CRUD.
//
// Responsabilidades del controlador:
//   1. Leer los datos del request (body, params, query).
//   2. Llamar al Modelo para operar con la base de datos.
//   3. Enviar la respuesta HTTP (json + código de estado).
//
// El controlador NO define las rutas — eso lo hace el router.
// El controlador NO habla directamente con la BD — eso lo hace el modelo.

const Usuario = require('../models/usuario.model');

// GET /usuarios → devuelve todos los usuarios
const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /usuarios/:id → devuelve un usuario por id
const obtener = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /usuarios → crea un nuevo usuario
const crear = async (req, res) => {
  try {
    const { nombre, email, edad, direccionUsuario } = req.body;
    const nuevoUsuario = await Usuario.create({ nombre, email, edad, direccionUsuario });
    // 201 Created es el código correcto al crear un recurso nuevo
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /usuarios/:id → actualiza un usuario completo
const actualizar = async (req, res) => {
  console.log('Actualizando usuario con id:', req.params.id);
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    console.log('Usuario encontrado:', usuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { nombre, email, edad } = req.body;
    await usuario.update({ nombre, email, edad });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /usuarios/:id → elimina un usuario
const eliminar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.json({ mensaje: `Usuario con id ${req.params.id} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportamos todas las funciones para que el router pueda usarlas.
module.exports = { listar, obtener, crear, actualizar, eliminar };
