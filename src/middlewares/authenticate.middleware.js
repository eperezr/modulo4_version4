// importamos jwt
const jwt = require('jsonwebtoken');

// importamos .env
require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        // Obtener el token del header authorization
        const authHeader = req.headers.authorization;

        // Obtenemos el token del header
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log('user', user);
            req.user = user;
            next();
        });

    } catch (error) {
        // Si hay un error, enviamos un mensaje
        res.status(401).json({ message: 'Usuario no autorizado' });
    }
}


module.exports = authenticate;