const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");

// POST /api/categories
exports.addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const subcategories = await SubCategory.find().lean();

    const result = categories.map((cat) => ({
      ...cat,
      subcategories: subcategories.filter(
        (sub) => sub.category?.toString() === cat._id.toString()
      ),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
