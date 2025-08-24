import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="category-list">
        <li>
          <Link
            to="/categories"
            className={`category-name ${
              location.pathname === "/categories" ? "active" : ""
            }`}
          >
            Categories
          </Link>
        </li>

        <li>
          <Link
            to="/subcategories"
            className={`category-name ${
              location.pathname === "/subcategories" ? "active" : ""
            }`}
          >
            Subcategories
          </Link>
        </li>

        <li>
          <Link
            to="/products"
            className={`category-name ${
              location.pathname.startsWith("/products") ? "active" : ""
            }`}
          >
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
