// Router
const router = require('express').Router();

// Controladores
const authController = require('../controllers/auth.controller');



// 1ra forma
router.post('/', authController.login);



// 2da forma



exports.router = router; 