import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SubCategoryPage.css";

export default function SubCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: ""
  });
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subcategories");
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) return alert("Fill all fields");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/subcategories", {
        name: formData.name.trim(),
        category: formData.category
      });
      setFormData({ name: "", category: "" });
      fetchSubCategories();
    } catch (error) {
      console.error("Error adding subcategory", error);
      alert("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subcat-page">
      {/* Form on left */}
      <div className="subcat-form">
        <h2>Add SubCategory</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            SubCategory Name:
            <input
              type="text"
              name="name"
              placeholder="Enter subcategory"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add SubCategory"}
          </button>
        </form>
      </div>

  
      <div className="subcat-list">
        <h2>Existing SubCategories</h2>
        {subCategories.length === 0 ? (
          <p>No subcategories found.</p>
        ) : (
          <ul>
            {subCategories.map((sub) => (
              <li key={sub._id}>
                
                <strong>{sub.name}</strong> — Category: {sub.category?.name || "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
