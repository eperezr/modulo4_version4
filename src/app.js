// requerimos de express, es un framework de node.js que nos permite crear servidores web   
const express = require('express');
const morgan = require('morgan');


// creamos una instancia de express
const app = express();


// Importamos middleware authenticate de la carpeta middlewares
const authenticate = require('./middlewares/authenticate.middleware');

// Importamos routes
const usersRoutes = require('./routes/users.routes');
const tasksRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');


// Middleware
app.use(morgan('dev')) // Middleware para loggear las peticiones


app.use(express.json()); // Midelware para parsear el body de una petición


// Routes
app.use('/api/users/',usersRoutes.router);
app.use('/api/tasks/', authenticate ,tasksRoutes.router);
app.use('/api/login', authRoutes.router)


// Exportamos la instancia de express
module.exports = app;


// Otra forma de exportar la instancia de express
// export default app;