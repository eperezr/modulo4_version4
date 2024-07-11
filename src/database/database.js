// Importamos zequelize
const Sequelize = require('sequelize');

// Importamos dotenv
require('dotenv').config();



// Exportamos la instancia de sequelize
exports.sequelize = new Sequelize(
    process.env.DB_DATABASE, // Nombre de la base de datos
    process.env.DB_USER, // Usuario
    process.env.DB_PASSWORD, // Contraseña
    {
        host: process.env.DB_HOST, // Host
        dialect : process.env.DB_DIALECT, // Dialecto
        port: process.env.DB_PORT, // Puerto
        logging: console.log, // Loguear consultas
        ssl: true, // SSL
    }
);




