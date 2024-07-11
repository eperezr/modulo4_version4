// Importamos el modelo de users
const User = require('../models/user');

// Importamos looger
const logger = require('../logs/logger');
const Status = require('../constants/index');


// Mis funciones de controlador para la entidad de usuarios

// Obtener la lista de usuarios
async function getUsers(req, res) {
    try {
        // const users = await User.findAll(); // Consultamos todos los usuarios 

        // Para que solo se muestren los 'id','username', 'password', 'status'
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'], // Solo se muestran estos campos
            order: [['id', 'DESC']], // Ordenamos por id de forma descendente
            where: { status: Status.ACTIVE } // Solo se muestran los usuarios activos
        });

        return res.json(users); // Enviar una respuesta JSON     
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}


// Crear un usuario
async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        // Logger (Se muestra en la consola)
        logger.info('[UserController] Usuario creado correctamente: ' + username);

        // Crear un usuario
        const user = await User.create({
            username, // Se puede escribir solo username
            password  // Se puede escribir solo password
        });

        // Enviar una respuesta JSON
        return res.json(user); // Use return here

    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// Listar un usuario
async function getUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['id', 'username', 'status'], // Solo se muestran estos campos
            where: { id }
        })
        //const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json(user); // Enviar una respuesta JSON
    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// Update a user xon funcion flecha
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username || !password) { return res.status(400).json({ message: 'Falta username o password' }) }

        const user = await User.update(
            {
                username, // username: username
                password  // password: password
            },
            {
                where: { id }
            }
        );
        res.json(user);

    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// Activar e inactivar un usuario
const activateInactivate = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) { return res.status(400).json({ message: 'Falta status' }) }


        const user = await User.findByPk(id);

        if (user.status === status) {
            return res.status(400).json({ message: `El usuario ya se encuentra en ese estado ${status}` });
        }

        user.status = status;
        await user.save();
        res.json(user);

    } catch (error) {
        // logger (Se muestra en la consola)
        logger.error(error.message);
        // Enviamos una respuesta de error (Se muestra en el navegador)
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.destroy({
            where: { id }
        });

        return res.sendStatus(204); // No hay contenido para mostrar

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
    getUsers,
    createUser,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser
};