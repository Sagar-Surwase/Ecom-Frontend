import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import "../CSS/Product.css";
import axios from "axios";

function Products() {

    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);

    const { category } = useParams();
    const navigate = useNavigate();


        const BASE_URL = "http://localhost:9092/product";

         const getCategoryWiseLaptops = (category) => {
            return axios.get(
                `${BASE_URL}/category/${category}/laptops`
            );
        };

    useEffect(() => {
        setLoading(true);
        fetchLaptops();
    }, [category]);

    const fetchLaptops = async () => {

        try {

            const response = await getCategoryWiseLaptops(category);

            setLaptops(response.data);

        } catch (error) {

            console.error("Error fetching laptops:", error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading laptops...</h2>;
    }

    return (
        <div className="products-container">

            <h1>
                {category ? `${category} Laptops` : "All Laptops"}
            </h1>

            <div className="product-grid">

                {
                    laptops.length > 0 ?

                        laptops.map((laptop) => (

                            <div
                                className="product-card"
                                key={laptop.lId}
                            >

                                <img
                                    src={
                                        laptop.imageUrl &&
                                        laptop.imageUrl.length > 0
                                            ? laptop.imageUrl[0]
                                            : "https://via.placeholder.com/300"
                                    }
                                    alt={laptop.lname}
                                />

                                <div className="details">

                                    <h3>{laptop.lname}</h3>

                                    <p>
                                        <strong>Processor:</strong>
                                        {" "}
                                        {laptop.processor}
                                    </p>

                                    <p>
                                        <strong>RAM:</strong>
                                        {" "}
                                        {laptop.ram} GB
                                    </p>

                                    <p>
                                        <strong>Storage:</strong>
                                        {" "}
                                        {laptop.storage} GB
                                    </p>

                                    <p>
                                        <strong>GPU:</strong>
                                        {" "}
                                        {laptop.gpu}
                                    </p>

                                    <p>
                                        <strong>OS:</strong>
                                        {" "}
                                        {laptop.operatingSystem}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>
                                        {" "}
                                        {laptop.status}
                                    </p>

                                    <h2 className="price">
                                        ₹ {laptop.price}
                                    </h2>

                                    <button
                                        onClick={() =>
                                            navigate(`/product/getSingleLaptop/${laptop.lId}`)
                                        }
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        ))

                        :

                        <h2>No laptops found.</h2>
                }

            </div>

        </div>
    );
}

export default Products;