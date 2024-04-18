const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { ensureAuthenticated } = require('../middlewares/userAuth');
const { validateToTask } = require('../middlewares/validateTask');

router.post('/new-task', ensureAuthenticated, validateToTask, taskController.addNewTask);
router.get('/tasks-list', ensureAuthenticated, taskController.tasksList);
router.get('/task-details', ensureAuthenticated, taskController.taskDetails);
router.put('/update', ensureAuthenticated, validateToTask, taskController.updateTask);
router.delete('/delete', ensureAuthenticated, taskController.deleteTask);

module.exports = router;