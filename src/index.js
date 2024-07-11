// Importamos app
//import app from './app';

// Importamos app
const app = require('./app');  // Otra forma de importar app


// Importamos pino desde la carpeta logs
const logger = require('./logs/logger');

// Importamos sequelize desde la carpeta database
const { sequelize } = require('./database/database');



// importar dotenv
require('dotenv').config();


async function main() {
    // Sincronizamos la base de datos
    await sequelize.sync({ force: true });  // force: true, elimina la tabla y la vuelve a crear
                                            // force: false, no elimina la tabla, solo la crea si no existe


    const port = process.env.PORT || 3000; // || 3000 es para que si no existe el puerto en el archivo .env, se ejecute en el puerto 3000
    // Inicializamos el servidor
    await app.listen(port);
    
    // console.log(`Servidor corriendo en el puerto: ${port}`);

    // Pino 
    logger.info(`Servidor corriendo en el puerto: ${port}`);
    // logger.warn(`Servidor corriendo en el puerto: ${port}`);
    // logger.error(`Servidor corriendo en el puerto: ${port}`);
    // logger.fatal(`Servidor corriendo en el puerto: ${port}`);   
    
}

main(); 