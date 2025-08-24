const Product = require("../model/Product");
const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, mrp, image, category, subCategory } = req.body;

    const catExists = await Category.findById(category);
    const subCatExists = await SubCategory.findById(subCategory);

    if (!catExists || !subCatExists) {
      return res.status(400).json({ error: "Invalid Category or SubCategory" });
    }

    const product = new Product({
      name,
      mrp,
      image,
      category,
      subCategory,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View All
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subCategory", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View One
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, mrp, image, category, subCategory } = req.body;

    const catExists = await Category.findById(category);
    const subCatExists = await SubCategory.findById(subCategory);

    if (!catExists || !subCatExists) {
      return res.status(400).json({ error: "Invalid Category or SubCategory" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, mrp, image, category, subCategory },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};