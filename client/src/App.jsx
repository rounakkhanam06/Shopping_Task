import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductPage from "./components/productPage";
import CategoryPage from "./components/categoryPage";
import SubCategoryPage from "./components/SubCategoryPage";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route  path="/" element={<h1>Welcome to   Website....Run the frontend and backend file(nodemon index.js) files to see the data. </h1>} />
            <Route path="/categories" element={<CategoryPage />} />
          
            <Route path="/subcategories" element={<SubCategoryPage />} />

            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


