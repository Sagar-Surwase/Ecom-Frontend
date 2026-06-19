import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        LaptopHub
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search laptops..."
        className="search"
      />

      {/* NAV LINKS */}
      <div className="nav-links">

        {/* NOT LOGGED IN */}
        {!role && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/cart")}>Cart</button>
          </>
        )}

        {/* CUSTOMER */}
        {role === "customer" && (
          <>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={() => navigate("/orders")}>Orders</button>
            <button onClick={() => navigate("/cart")}>Cart</button>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/admin/profile")}>Profile</button>
            <button onClick={() => navigate("/admin/products")}>Products</button>
            <button onClick={() => navigate("/admin/orders")}>Orders</button>
            <button onClick={() => navigate("/admin/payments")}>Payments</button>
            <button onClick={logout}>Logout</button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;