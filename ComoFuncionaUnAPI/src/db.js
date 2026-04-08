// ============================================================
// db.js — Conexión a la base de datos con Sequelize
// ============================================================
//
// Sequelize es un ORM (Object-Relational Mapper).
// Te permite trabajar con la base de datos usando JavaScript
// en lugar de escribir SQL puro.
//
// Este archivo crea UNA SOLA instancia de Sequelize y la exporta
// para que todos los modelos la reutilicen (patrón Singleton).

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,   // nombre de la base de datos
  process.env.DB_USER,   // usuario de Postgres
  process.env.DB_PASS,   // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',  // le decimos a Sequelize que usamos PostgreSQL
    logging: false,       // en true mostraría el SQL generado en la consola
  },
);

module.exports = sequelize;
