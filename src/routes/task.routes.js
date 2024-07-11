// Router
const router = require('express').Router();

// Importamos controllers
const tasksController = require('../controllers/tasks.controller');

// Importamos middleware authenticate de la carpeta middlewares
const authenticate = require('../middlewares/authenticate.middleware');

// 1ra forma
/* router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask); */

// 2da forma
router
    .route('/')
    .get(authenticate, tasksController.getTasks)
    .post(authenticate, tasksController.createTask);

router.route('/:id')
    .get(authenticate, tasksController.getTask)
    .put(authenticate, tasksController.updateTask) 
    .delete(authenticate, tasksController.deleteTask)
    .patch(authenticate, tasksController.taskDone);

exports.router = router;
