// Importamos el modelo de users
const User = require('../models/user');

// Importamos looger
const logger = require('../logs/logger');

// Importamos bcrypt desde la carpeta common
const { comparar } = require('../common/bcrypt');

// Importamos JWT
const jwt = require('jsonwebtoken');

// Importamos Status
const Status = require('../constants/index');

// importamos .env
require('dotenv').config();

// Mis funciones de controlador para la entidad de usuarios

// Obtener la lista de usuarios
async function login(req, res) {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                username, // username: username
                status: Status.ACTIVE
            }
        });

        // Si el usuario no existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, comparamos la contraseña
        if (!(await comparar(password, user.password))) {
            return res.status(403).json({ message: 'Usuario no autorizado' });
        }

        // Generar el token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN 
            // expiresIn: eval(process.env.JWT_EXPIRES_IN) // eval() convierte una cadena en una expresión, encaso de que el valor sea un número
                                                            // Por ejemplo JWT_EXPIRES_IN= 60*60=3600 // 1 hora
        });

        // Enviar una respuesta JSON
        res.json({ token });

    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }

}





// Exportamos la función getUsers
module.exports = {
    login
};