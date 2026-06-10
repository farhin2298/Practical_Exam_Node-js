const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.post('/delete/:id', deleteCategory);

module.exports = router;
