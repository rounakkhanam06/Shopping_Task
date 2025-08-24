
import React, { useEffect, useState } from "react";
import "./ProductPage.css";

function ProductPage() {
  const [activeTab, setActiveTab] = useState("view");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    image: "",
    category: "",
    subCategory: ""
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  };

  const fetchSubCategories = () => {
    fetch("http://localhost:5000/api/subcategories")
      .then(res => res.json())
      .then(data => setSubCategories(data))
      .catch(console.error);
  };

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url = "http://localhost:5000/api/products";
      let method = "POST";

      if (editingProduct) {
        url += `/${editingProduct._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");

      alert(editingProduct ? "Product updated!" : "Product added!");

      setFormData({
        name: "",
        mrp: "",
        image: "",
        category: "",
        subCategory: "",
      });
      setEditingProduct(null);
      fetchProducts();
      setActiveTab("view");
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("Product deleted!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      mrp: product.mrp,
      image: product.image,
      category: product.category?._id || "",
      subCategory: product.subCategory?._id || "",
    });
    setActiveTab("add");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      mrp: "",
      image: "",
      category: "",
      subCategory: "",
    });
  };

  return (
    <div className="product-page">
      <div className="tabs">
        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
          View Products
        </button>
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => {
            setActiveTab("add");
            handleCancelEdit();
          }}
        >
          {editingProduct ? "Edit Product" : "Add Product"}
        </button>
      </div>

      {/* View Products */}
      {activeTab === "view" && (
        <div className="view-products">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="product-list">
              {products.map((p) => (
                <div key={p._id} className="product-card">
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>MRP: ₹{p.mrp}</p>
                  <p>Category: {p.category?.name || "N/A"}</p>
                  <p>SubCategory: {p.subCategory?.name || "N/A"}</p>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Product */}
      {activeTab === "add" && (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="mrp"
            placeholder="MRP"
            value={formData.mrp}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button type="button" onClick={handleCancelEdit} disabled={loading}>
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default ProductPage;
