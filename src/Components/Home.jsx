import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  function handleCategoryClick(category)
  {
    navigate(`/products/category/${category}`);
  };




  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Perfect Laptop</h1>
          <p>
            Gaming, Business, Student & Professional Laptops at Best Prices
          </p>
          <button>Shop Now</button>
        </div>
      </section>


     <section className="categories">
      <h2>Shop By Category</h2>

      <div className="category-grid">

        <div
          className="card"
          onClick={() => handleCategoryClick("Gaming")}
        >
          Gaming Laptops
        </div>

        <div
          className="card"
          onClick={() => handleCategoryClick("Business")}
        >
          Business Laptops
        </div>

        <div
          className="card"
          onClick={() => handleCategoryClick("Student")}
        >
          Student Laptops
        </div>

        <div
          className="card"
          onClick={() => handleCategoryClick("Home")}
        >
          Home Laptop
        </div>

      </div>
    </section>

      <section className="products">
        <h2>Featured Laptops</h2>

        <div className="product-grid">
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" />
            <h3>HP Victus</h3>
            <p>₹74,999</p>
            <button>View Details</button>
          </div>

          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/8107BhtbdyL._SX679_.jpg" />
            <h3>Lenovo LOQ</h3>
            <p>₹69,999</p>
            <button>View Details</button>
          </div>

          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2" />
            <h3>Dell Inspiron</h3>
            <p>₹59,999</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      <section className="offer-section">
        <h2>Special Offers</h2>
        <div className="offer-card">
          Up to 30% OFF on Gaming Laptops
        </div>
      </section>

      <section className="why-us">
        <h2>Why LaptopHub?</h2>

        <div className="features">
          <div>✔ Genuine Products</div>
          <div>✔ Fast Delivery</div>
          <div>✔ Secure Payments</div>
          <div>✔ Easy Returns</div>
        </div>
      </section>

    </>
  );
}

export default Home;