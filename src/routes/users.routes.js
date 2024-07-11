// Router
const router = require('express').Router();

// Importamos controllers
const usersController = require('../controllers/users.controller');


// 1ra forma
/* router.get('/', usersController.getUsers);
router.post('/', usersController.createUser); */



// 2da forma
router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);
 
router.route('/:id')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
    .patch(usersController.activateInactivate);

exports.router = router; 