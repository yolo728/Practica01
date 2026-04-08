// ============================================================
// models/usuario.model.js — Modelo de la tabla "usuarios"
// ============================================================
//
// Un MODELO describe la estructura de una tabla en la base de datos.
// Sequelize usa este modelo para:
//   - Crear la tabla automáticamente (si no existe)
//   - Generar el SQL de SELECT, INSERT, UPDATE, DELETE
//
// Equivalente en NestJS/TypeORM: la clase con @Entity y @Column.

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define(
  'Usuario',   // nombre del modelo (Sequelize crea la tabla "Usuarios" en plural)
  {
    // Sequelize agrega "id" auto-incremental automáticamente si no lo defines.

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,              // equivale a NOT NULL en SQL
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,                  // no pueden existir dos usuarios con el mismo email
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',           // fuerza el nombre de la tabla en minúscula
    timestamps: true,                // agrega createdAt y updatedAt automáticamente
  },
);

module.exports = Usuario;
