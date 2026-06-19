import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const CART_URL = "http://localhost:9093/cart";
    const ORDER_URL = "http://localhost:9094/orders";

    const [cart, setCart] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {

            const response = await axios.get(
                `${CART_URL}/viewCart/${userId}`
            );

            setCart(response.data);

        } catch (error) {

            console.log(error);
            alert("Unable to load cart");

        } finally {

            setLoading(false);
        }
    };

    const removeItem = async (cartItemId) => {

        try {

            await axios.delete(
                `${CART_URL}/deleteCartItem/${userId}/${cartItemId}`
            );

            fetchCart();

        } catch (error) {

            console.log(error);
            alert("Unable to remove item");
        }
    };

    // Calculate total amount
    const totalPrice =
        cart?.cartItem?.reduce(
            (total, item) => total + item.subtotal,
            0
        ) || 0;

    const placeOrder = async () => {

        try {

            // Place Order
            const orderResponse = await axios.post(
                `${ORDER_URL}/place/${userId}`
            );

            const order = orderResponse.data;

            // Make Payment
            await axios.post(
                `${ORDER_URL}/payment/${order.orderId}`,
                {
                    paymentMethod: paymentMethod
                }
            );

            alert("Order placed successfully!");

            // Redirect to Orders Page with Current Order ID
            navigate("/orders", {
                state: {
                    currentOrderId: order.orderId
                }
            });

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data || "Unable to place order."
            );
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="checkout-container">

            <div className="checkout-left">

                <h2>Order Summary</h2>

                {cart?.cartItem?.length === 0 ? (

                    <h3>Your Cart is Empty</h3>

                ) : (

                    cart?.cartItem?.map(item => (

                        <div
                            className="summary-item"
                            key={item.cartItemId}
                        >

                            <h4>
                                Laptop ID : {item.laptopId}
                            </h4>

                            <p>
                                Quantity : {item.quantity}
                            </p>

                            <p>
                                Price : ₹{item.unitPrice}
                            </p>

                            <p>
                                Subtotal : ₹{item.subtotal}
                            </p>

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeItem(item.cartItemId)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))
                )}

            </div>

            <div className="checkout-right">

                <h2>Payment</h2>

                <div className="payment-options">

                    <label>
                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        Cash On Delivery
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="UPI"
                            checked={paymentMethod === "UPI"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        UPI
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="CARD"
                            checked={paymentMethod === "CARD"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        Debit / Credit Card
                    </label>

                </div>

                <hr />

                <h3>
                    Total : ₹{totalPrice.toLocaleString()}
                </h3>

                <button
                    className="pay-btn"
                    onClick={placeOrder}
                >
                    Proceed To Pay
                </button>

            </div>

        </div>
    );
}

export default Checkout;