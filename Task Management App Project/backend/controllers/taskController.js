const Task = require('../models/Task');
const Category = require('../models/Category');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const isAdmin = req.user.role === 'admin';
        const showAll = req.query.all === 'true' && isAdmin;

        const filter = showAll ? {} : { user: req.user.id };
        const tasks = await Task.find(filter)
            .populate('user', 'username role')
            .populate('category', 'name');

        res.render('taskList', { tasks, user: req.user, showAll, title: 'Tasks' });
    } catch (err) {
        res.render('error', { error: 'Failed to load tasks' });
    }
};

// Show Add/Edit Form
exports.getTaskForm = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        let task = null;

        if (req.params.id) {
            task = await Task.findById(req.params.id);
        }

        res.render('taskForm', { task, categories, user: req.user, title: 'Task Form' });
    } catch (err) {
        res.redirect('/tasks');
    }
};

// Create New Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, category } = req.body;

        const taskData = {
            title,
            description,
            status,
            user: req.user.id
        };

        if (category && category !== "") {
            taskData.category = category;
        }

        await Task.create(taskData);
        res.redirect('/tasks');
    } catch (err) {
        console.error("Task Create Error:", err);
        res.redirect('/tasks');
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, category } = req.body;

        const updateData = {
            title,
            description,
            status
        };

        if (category && category !== "") {
            updateData.category = category;
        } else {
            updateData.category = null;
        }

        await Task.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/tasks');
    } catch (err) {
        res.redirect('/tasks');
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (err) {
        res.redirect('/tasks');
    }
};
