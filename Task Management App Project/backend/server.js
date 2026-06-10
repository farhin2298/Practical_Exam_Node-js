const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Set static folder
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Global User Middleware
const jwt = require('jsonwebtoken');
const User = require('./models/User');
app.use(async (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = await User.findById(decoded.id);
        } catch (err) {
            res.clearCookie('token');
        }
    }
    next();
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));

// Root route - Render landing page or redirect to dashboard
app.get('/', (req, res) => {
    if (res.locals.user) {
        return res.redirect('/tasks');
    }
    res.render('index');
});

// Auth redirect routes
app.get('/login', (req, res) => res.redirect('/auth/login'));
app.get('/register', (req, res) => res.redirect('/auth/register'));
app.get('/logout', (req, res) => res.redirect('/auth/logout'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running!`);
    console.log(`🔗 Main App:   http://localhost:${PORT}`);
    console.log(`📂 Categories: http://localhost:${PORT}/categories\n`);
    console.log(`Press Ctrl+C to stop the server.\n`);
});
