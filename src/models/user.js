// importamos sequelize desde la carpeta database
const { sequelize } = require('../database/database');
const { DataTypes } = require('sequelize');

// importamos bcrypt desde la carpeta common
const { encriptar, comparar } = require('../common/bcrypt');

// Importamos logger
const logger = require('../logs/logger');

console.log('Encriptar:', encriptar);
console.log('Comparar:', comparar);

// importamos Task desde la carpeta models
const Task = require('../models/task');

console.log('Task:', Task);


// importamos Status de la carpeta constants
const Status = require('../constants/index');

console.log('Status:', Status);

// Modelo de usuario
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false, // NOT NULL
        validate: {
            notNull: {
                msg: 'El campo username es requerido'
            }
        }
    },
    password: {
        type: DataTypes.STRING, // VARCHAR(255)  // Como importar DataTypes: const { DataTypes } = require('sequelize');
        allowNull: false, // NOT NULL
        validate: {
            notNull: {
                msg: 'El campo password es requerido'
            }
        }
    },
    status: {
        type: DataTypes.STRING, // BOOLEAN
        defaultValue: Status.ACTIVE, // DEFAULT 'active'
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: ` El campo status solo puede tener los valores ${Status.ACTIVE} o ${Status.INACTIVE}`
            }
        }
    }
});


// RELACION: (Forma Automatica) uno a muchos, un usuario puede tener muchas tareas
User.hasMany(Task); // Un usuario puede tener muchas tareas
// Pero una tarea solo puede pertenecer a un usuario
Task.belongsTo(User); // Una tarea solo puede pertenecer a un usuario


// RELACION: (Forma Manual) uno a muchos, un usuario puede tener muchas tareas
/* User.hasMany(Task, { 
    foreignKey: 'userId ',
    sourceKey: 'id',
}); // Un usuario puede tener muchas tareas
// Pero una tarea solo puede pertenecer a un usuario
Task.belongsTo(User, { 
    foreignKey: 'userId',
    targetKey: 'id',
 }); // Una tarea solo puede pertenecer a un usuario */



// Encryptar la contraseña antes de guardar en la base de datos
User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña'); // Lanzamos un error, esto se mostrará en el navegador
    }
});

// Encryptar la contraseña antes de actualizar en la base de datos
User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña'); // Lanzamos un error, esto se mostrará en el navegador
    }
});


module.exports = User; // Exporta el modelo User usando CommonJS