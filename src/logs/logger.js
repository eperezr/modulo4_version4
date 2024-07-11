// importamos la librería pino
const pino = require('pino');

// Creamos un logger
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

// Exportamos el logger
module.exports = logger;