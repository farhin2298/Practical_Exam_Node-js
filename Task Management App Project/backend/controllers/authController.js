const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.create({ username, password, role: role || 'user' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).redirect('/tasks');
    } catch (err) {
        res.render('register', { error: 'Username already exists or invalid data', title: 'Register' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.render('login', { error: 'Invalid username or password', title: 'Login' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).redirect('/tasks');
    } catch (err) {
        res.render('login', { error: 'Check your credentials', title: 'Login' });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token').redirect('/login');
};
