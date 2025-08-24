const SubCategory = require("../model/SubCategory");

// POST /api/subcategories
exports.addSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/subcategories
exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category").lean();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
