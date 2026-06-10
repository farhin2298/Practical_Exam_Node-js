const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.redirect('/login');
        next();
    } catch (err) {
        res.redirect('/login');
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Not authorized');
        }
        next();
    };
};
