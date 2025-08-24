import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryPage.css";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/categories", { name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Error adding category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-page">
      <div className="form-container">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      <div className="category-list-container">
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.length === 0 && <p>No categories found.</p>}
          {categories.map((cat) => (
            <li key={cat._id}>{cat.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

