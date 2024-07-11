// importamos sequelize
const { sequelize } = require('../database/database');
const { DataTypes } = require('sequelize');

// importamos Status de la carpeta constants
const { Status } = require('../constants/index');

// Modelo de usuario
const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false, // NOT NULL
        validate: {
            notNull: {
                msg: 'Ingrese la tarea'
            }
        }
    },
    done: {
        type: DataTypes.BOOLEAN, // BOOLEAN
        defaultValue: false, // DEFAULT 'false'
    }
});


module.exports = Task; // Exporta el modelo Task usando CommonJS

