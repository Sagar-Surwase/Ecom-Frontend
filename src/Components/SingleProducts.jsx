import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/SingleProduct.css";

function SingleProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [laptop, setLaptop] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [message, setMessage] = useState("");

    const [activeTab, setActiveTab] = useState("overview");

    const PRODUCT_BASE_URL = "http://localhost:9092/product";
    const CART_BASE_URL = "http://localhost:9093/cart";

    useEffect(() => {

        fetchLaptop();

    }, [id]);

    const fetchLaptop = async () => {

        try {

            const laptopResponse = await axios.get(
                `${PRODUCT_BASE_URL}/getSingleLaptop/${id}`
            );

            setLaptop(laptopResponse.data);

            if (
                laptopResponse.data.imageUrl &&
                laptopResponse.data.imageUrl.length > 0
            ) {
                setSelectedImage(
                    laptopResponse.data.imageUrl[0]
                );
            }

            const categoryName =
                laptopResponse.data.category?.cname;

            if (categoryName) {

                const relatedResponse = await axios.get(
                    `${PRODUCT_BASE_URL}/category/${categoryName}/laptops`
                );

                const filtered =
                    relatedResponse.data.filter(
                        item =>
                            item.lId !== laptopResponse.data.lId
                    );

                setRelatedProducts(filtered);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const increaseQty = () => {

        if (quantity < laptop.stockQuantity) {

            setQuantity(quantity + 1);
        }
    };

    const decreaseQty = () => {

        if (quantity > 1) {

            setQuantity(quantity - 1);
        }
    };

   const addToCart = async () => {

    try {

            await axios.post(
                `${CART_BASE_URL}/cart/add/${userId}/${laptop.lId}/${quantity}`
            );

        setMessage("Laptop added to cart successfully.");

    } catch (error) {

        console.log(error);

        alert("Unable to add laptop to cart.");
    }
};

    const buyNow = () => {

        navigate("/checkout", {

            state: {

                laptop,
                quantity
            }
        });
    };

    if (loading) {

        return (

            <div className="loading-container">

                <h2>Loading Product...</h2>

            </div>
        );
    }

    if (!laptop) {

        return (

            <div className="loading-container">

                <h2>Laptop not found.</h2>

            </div>
        );
    }

    return (

        <div className="single-product-wrapper">

            <div className="single-product-container">

                {/* LEFT SECTION */}

                <div className="product-images">

                    <div className="thumbnail-container">

                        {
                            laptop.imageUrl?.map(
                                (img, index) => (

                                    <img
                                        key={index}
                                        src={img}
                                        alt="thumbnail"
                                        className={`thumbnail-image ${
                                            selectedImage === img
                                                ? "active-thumbnail"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedImage(img)
                                        }
                                    />
                                )
                            )
                        }

                    </div>

                    <div className="main-image-container">

                        <img
                            src={selectedImage}
                            alt={laptop.lname}
                            className="main-image"
                        />

                    </div>

                </div>

                {/* RIGHT SECTION */}

                <div className="product-details">

                    {
                        message &&

                        <div className="success-message">

                            {message}

                        </div>
                    }

                    <p className="category-name">

                        {laptop.category?.cname}

                    </p>

                    <h1 className="product-title">

                        {laptop.lname}

                    </h1>

                    <p className="availability">

                        Status :

                        <span>

                            {" "}

                            {laptop.status}

                        </span>

                    </p>

                    <h2 className="price">

                        ₹ {laptop.price.toLocaleString()}

                    </h2>

                    <p className="stock">

                        Stock Available :

                        {" "}

                        {laptop.stockQuantity}

                    </p>

                    {/* Quantity */}

                    <div className="quantity-section">

                        <h4>

                            Quantity

                        </h4>

                        <div className="quantity-box">

                            <button
                                onClick={decreaseQty}
                            >
                                -
                            </button>

                            <span>

                                {quantity}

                            </span>

                            <button
                                onClick={increaseQty}
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="button-group">

                        <button
                            className="add-cart-btn"
                            onClick={addToCart}
                        >
                            Add To Cart
                        </button>

                        <button
                            className="buy-now-btn"
                            onClick={buyNow}
                        >
                            Buy Now
                        </button>

                    </div>

                    {/* Tabs */}

                    <div className="tabs">

                        <button
                            className={
                                activeTab === "overview"
                                    ? "active-tab"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab("overview")
                            }
                        >
                            Overview
                        </button>

                        <button
                            className={
                                activeTab === "specs"
                                    ? "active-tab"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab("specs")
                            }
                        >
                            Specifications
                        </button>

                        <button
                            className={
                                activeTab === "reviews"
                                    ? "active-tab"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab("reviews")
                            }
                        >
                            Reviews
                        </button>

                    </div>
                                        {/* Overview */}

                    {
                        activeTab === "overview" &&

                        <div className="overview">

                            <p>

                                Experience exceptional performance with the{" "}
                                <strong>{laptop.lname}</strong>.

                                Designed for productivity and gaming, this laptop
                                delivers powerful performance, stunning visuals,
                                and reliable battery life for everyday use.

                            </p>

                        </div>
                    }


                    {/* Specifications */}

                    {
                        activeTab === "specs" &&

                        <div className="specifications">

                            <h3>Specifications</h3>

                            <div className="spec-grid">

                                <div>

                                    <strong>Processor</strong>

                                    <p>{laptop.processor}</p>

                                </div>

                                <div>

                                    <strong>RAM</strong>

                                    <p>{laptop.ram} GB</p>

                                </div>

                                <div>

                                    <strong>Storage</strong>

                                    <p>{laptop.storage} GB</p>

                                </div>

                                <div>

                                    <strong>GPU</strong>

                                    <p>{laptop.gpu}</p>

                                </div>

                                <div>

                                    <strong>Display Size</strong>

                                    <p>{laptop.displaySize}</p>

                                </div>

                                <div>

                                    <strong>Resolution</strong>

                                    <p>{laptop.displayResolution}</p>

                                </div>

                                <div>

                                    <strong>Battery</strong>

                                    <p>{laptop.battery}</p>

                                </div>

                                <div>

                                    <strong>Operating System</strong>

                                    <p>{laptop.operatingSystem}</p>

                                </div>

                                <div>

                                    <strong>Weight</strong>

                                    <p>{laptop.weight} Kg</p>

                                </div>

                                <div>

                                    <strong>Color</strong>

                                    <p>{laptop.color}</p>

                                </div>

                            </div>

                        </div>
                    }


                    {/* Reviews */}

                    {
                        activeTab === "reviews" &&

                        <div className="reviews">

                            <div className="review-card">

                                <h4>⭐⭐⭐⭐⭐</h4>

                                <p>

                                    Excellent performance and smooth gaming experience.

                                </p>

                            </div>

                            <div className="review-card">

                                <h4>⭐⭐⭐⭐</h4>

                                <p>

                                    Great display quality and battery backup.

                                </p>

                            </div>

                            <div className="review-card">

                                <h4>⭐⭐⭐⭐⭐</h4>

                                <p>

                                    Worth buying. Highly recommended.

                                </p>

                            </div>

                        </div>
                    }

                </div>

            </div>


            {/* Related Products */}

            {
                relatedProducts.length > 0 &&

                <div className="related-section">

                    <h2>

                        You May Also Like

                    </h2>

                    <div className="related-grid">

                        {
                            relatedProducts.map(product => (

                                <div
                                    className="related-card"
                                    key={product.lId}
                                    onClick={() =>
                                        navigate(
                                            `/product/getSingleLaptop/${product.lId}`
                                        )
                                    }
                                >

                                    <img
                                        src={
                                            product.imageUrl &&
                                            product.imageUrl.length > 0
                                                ? product.imageUrl[0]
                                                : "https://via.placeholder.com/250"
                                        }
                                        alt={product.lname}
                                    />

                                    <h4>

                                        {product.lname}

                                    </h4>

                                    <p>

                                        ₹ {product.price.toLocaleString()}

                                    </p>

                                </div>

                            ))
                        }

                    </div>

                </div>
            }

        </div>
    );
}

export default SingleProduct;