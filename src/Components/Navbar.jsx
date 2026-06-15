import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        LaptopHub
      </div>

      <input
        type="text"
        placeholder="Search laptops..."
        className="search"
      />

      <div className="nav-links">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/cart")}>Cart</button>
      </div>
    </nav>
  );
}

export default Navbar;