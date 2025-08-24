const express = require("express");
const {
  addCategory,
  getCategoriesWithSubcategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", addCategory);
router.get("/", getCategoriesWithSubcategories);

module.exports = router;
