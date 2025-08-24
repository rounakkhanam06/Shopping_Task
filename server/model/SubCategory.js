const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" } // Parent Category
});

const subcategoriesModule = mongoose.model("SubCategory", subCategorySchema);

module.exports = subcategoriesModule;


