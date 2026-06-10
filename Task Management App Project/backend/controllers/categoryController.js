const Category = require('../models/Category');

// GET all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.render('categoryList', { categories, user: req.user, title: 'Categories' });
    } catch (err) {
        res.redirect('/tasks');
    }
};

// CREATE new category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') return res.redirect('/categories');

        await Category.create({
            name: name.trim(),
            user: req.user.id
        });

        console.log("DEBUG: Category added, redirecting to /categories?success=true");
        res.redirect('/categories?success=true');
    } catch (err) {
        console.error("DEBUG: Create Category Error:", err);
        res.redirect('/categories');
    }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.redirect('/categories');
    } catch (err) {
        res.redirect('/categories');
    }
};
