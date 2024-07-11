// Importamos el modelo de tasks
const Task = require('../models/task');

// Importamos looger  de la carpeta logs
const logger = require('../logs/logger');



// Mis funciones de controlador para la entidad de tasks

async function getTasks(req, res) {
    const { id } = req.body;

    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'], // Solo se muestran estos campos
            order: [['name', 'ASC']], // Ordenamos por id de forma descendente
            where: {
                userId: id // userId: userId
            }
        });
        res.json(tasks); // Enviar una respuesta JSON
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }

}

async function createTask(req, res) {
    const { name } = req.body;
    const { userId } = req.user;

    try {
        const task = await Task.create({
            name,
            userId
        });
        res.json(task); // Enviar una respuesta JSON
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// getTask
async function getTask(req, res) {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'], // Solo se muestran estos campos
            where: {
                id,
                userId
            }
        })
        res.json(task); // Enviar una respuesta JSON
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// updateTask
async function updateTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;

    try {
        const task = await Task.update(
            {
                name
            },
            {
                where: { id, userId }
            }
        );

        if (task[0] === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// taskDone
async function taskDone(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { done } = req.body;

    try {
        const task = await Task.update(
            {
                done
            },
            {
                where: { id, userId }
            }
        );

        if (task[0] === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }

}

// deleteTask
const deleteTask = async (req, res) => {
    // const { userId } = req.user;
    const { id } = req.params;

    try {
        const task = await Task.destroy({
            where: { id }
        });

        return res.sendStatus(204);
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
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask
};
