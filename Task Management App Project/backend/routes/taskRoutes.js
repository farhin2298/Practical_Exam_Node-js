const express = require('express');
const router = express.Router();
const { getTasks, getTaskForm, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // All task routes protected

router.route('/')
    .get(getTasks)
    .post(createTask);

router.get('/add', getTaskForm);
router.get('/edit/:id', getTaskForm);
router.post('/edit/:id', updateTask);
router.post('/delete/:id', deleteTask);

module.exports = router;
