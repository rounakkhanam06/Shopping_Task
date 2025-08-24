const express = require("express");
const {
  addSubCategory,
  getSubCategories,
 
} = require("../controllers/subcategoryController");

const router = express.Router();


router.post("/", addSubCategory);          
router.get("/", getSubCategories);         



module.exports = router;


