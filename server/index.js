const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route 
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/categoryDB";

// Middleware
app.use(cors());
app.use(express.json());

// we will use /api before any route....
app.use("/api/categories", categoryRoutes);       
app.use("/api/subcategories", subcategoryRoutes); 
app.use("/api/products", productRoutes);           


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));






