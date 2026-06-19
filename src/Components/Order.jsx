import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Order.css";
import { useNavigate } from "react-router-dom";

function Order() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const id = localStorage.getItem("userId");

    const userName =
        localStorage.getItem("userName") || "Customer";

    const address =
        localStorage.getItem("address") ||
        "Pune, Maharashtra, India";

    const ORDER_BASE_URL =
        "http://localhost:9094/orders";

    useEffect(() => {

        if (id) {
            fetchOrders();
        }

    }, [id]);

    const fetchOrders = async () => {

        try {

            const response = await axios.get(
                `${ORDER_BASE_URL}/user/${id}`
            );

            setOrders(response.data || []);

        } catch (error) {

            console.log(
                "Fetch orders error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


const confirmOrder = async () => {
    try {

        // Latest order
        const currentOrder = orders[orders.length - 1];

        // Fetch user details from backend
        const userResponse = await axios.get(
            `http://localhost:9091/user/getUser/${id}`
        );

        navigate("/order-success", {
            state: {
                order: currentOrder,
                user: userResponse.data
            }
        });

    } catch (error) {
        console.log(error);
        alert("Unable to load order details.");
    }
};


    if (loading) {

        return (
            <h2 className="loading">
                Loading Orders...
            </h2>
        );
    }

    return (

        <div className="orders-container">

            <div className="orders-header">

                <h1>My Orders</h1>

                <button
                    className="place-order-btn"
                    onClick={confirmOrder}
                >
                    Confirm Order
                </button>

            </div>

            {orders.length === 0 ? (

                <div className="empty-orders">

                    <h2>No Orders Found</h2>

                </div>

            ) : (

                <>
                    {/* Current Order */}

                    <div className="current-order-section">

                        <h2 className="current-order-title">
                            Current Order
                        </h2>

                        {(() => {

                            const currentOrder =
                                orders[orders.length - 1];

                            return (

                                <div
                                    className="order-card current-order"
                                    key={currentOrder.orderId}
                                >

                                    <div className="order-top">

                                        <h3>
                                            Order #
                                            {currentOrder.orderId}
                                        </h3>

                                        <span
                                            className={`status ${currentOrder.orderStatus}`}
                                        >
                                            {
                                                currentOrder.orderStatus
                                            }
                                        </span>

                                    </div>

                                    <p>
                                        <b>Date:</b>{" "}
                                        {
                                            currentOrder.orderDate
                                                ? new Date(
                                                    currentOrder.orderDate
                                                ).toLocaleString()
                                                : "N/A"
                                        }
                                    </p>

                                    <p>
                                        <b>Total:</b> ₹{" "}
                                        {
                                            currentOrder.totalAmount?.toLocaleString()
                                        }
                                    </p>

                                    <div className="order-items">

                                        {currentOrder.orderItems?.map(
                                            (item) => (

                                                <div
                                                    className="item-card"
                                                    key={
                                                        item.orderItemId
                                                    }
                                                >

                                                    <div className="item-info">

                                                        <h4>
                                                            {
                                                                item.laptopName
                                                            }
                                                        </h4>

                                                        <p>
                                                            Quantity:{" "}
                                                            {
                                                                item.quantity
                                                            }
                                                        </p>

                                                        <p>
                                                            Unit Price:
                                                            ₹{" "}
                                                            {
                                                                item.unitPrice
                                                            }
                                                        </p>

                                                        <p className="subtotal">
                                                            Subtotal:
                                                            ₹{" "}
                                                            {
                                                                item.subtotal
                                                            }
                                                        </p>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            );

                        })()}

                    </div>

                    {/* Previous Orders */}

                    {orders.length > 1 && (

                        <>
                            <h2 className="previous-orders-title">
                                Previous Orders
                            </h2>

                            {orders
                                .slice(0, orders.length - 1)
                                .reverse()
                                .map((order) => (

                                    <div
                                        className="order-card"
                                        key={order.orderId}
                                    >

                                        <div className="order-top">

                                            <h3>
                                                Order #
                                                {order.orderId}
                                            </h3>

                                            <span
                                                className={`status ${order.orderStatus}`}
                                            >
                                                {
                                                    order.orderStatus
                                                }
                                            </span>

                                        </div>

                                        <p>
                                            <b>Date:</b>{" "}
                                            {
                                                order.orderDate
                                                    ? new Date(
                                                        order.orderDate
                                                    ).toLocaleString()
                                                    : "N/A"
                                            }
                                        </p>

                                        <p>
                                            <b>Total:</b> ₹{" "}
                                            {
                                                order.totalAmount?.toLocaleString()
                                            }
                                        </p>

                                    </div>
                                ))}
                        </>
                    )}

                </>
            )}

        </div>
    );
}

export default Order;