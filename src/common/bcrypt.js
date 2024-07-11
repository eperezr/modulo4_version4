// Importamos bcrypt
const bcrypt = require('bcrypt');

// Importamos logger
const logger = require('../logs/logger');

// Importamos dotenv
require('dotenv').config();


// Función para encriptar
const encriptar = async (text) => {

    try {
        const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10); // Obtenemos el valor de SALT_ROUND desde el archivo .env
                                                                        // Antes de usarlo, lo convertimos a número entero con parseInt
        return await bcrypt.hash(text, saltRound); // Encriptamos la contraseña        
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña'); // Lanzamos un error, esto se mostrará en el navegador
    }

}

// Función para comparar contraseñas
const comparar = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash); // Comparamos la contraseña
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar las contraseñas'); // Lanzamos un error, esto se mostrará en el navegador
    }
}

module.exports = { encriptar, comparar }; // Exportamos la función encriptar