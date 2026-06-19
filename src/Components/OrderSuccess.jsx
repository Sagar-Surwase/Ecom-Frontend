import React from "react";
import "../CSS/OrderSuccess.css";
import { useNavigate, useLocation } from "react-router-dom";

function OrderSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    const order = location.state?.order;
    const user = location.state?.user;

    if (!order || !user) {
        return (
            <div className="success-container">
                <div className="success-card">
                    <h2>No Order Details Found.</h2>

                    <button
                        className="shop-btn"
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const address =
        user.addresses?.length > 0
            ? `${user.addresses[0].addressLine1},
               ${user.addresses[0].city},
               ${user.addresses[0].state}
               ${user.addresses[0].pincode}`
            : "Address Not Available";

    return (
        <div className="success-container">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Order Placed Successfully!</h1>

                <p className="thank-you">
                    Thank you for shopping with LaptopHub.
                </p>

                <p className="success-text">
                    Your payment was successful and your order has been confirmed.
                </p>

                {/* Customer Details */}
                <div className="section">

                    <h3>Customer Details</h3>

                    <p>
                        <strong>Name :</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email :</strong> {user.email}
                    </p>

                    <p>
                        <strong>Mobile :</strong> {user.mobile}
                    </p>

                    <p>
                        <strong>Delivery Address :</strong>
                        <br />
                        {address}
                    </p>

                </div>

                {/* Order Details */}
                <div className="section">

                    <h3>Order Details</h3>

                    <p>
                        <strong>Order ID :</strong>
                        {" "}
                        {order.orderId}
                    </p>

                    <p>
                        <strong>Order Number :</strong>
                        {" "}
                        {order.orderNumber}
                    </p>

                    <p>
                        <strong>Order Date :</strong>
                        {" "}
                        {
                            order.orderDate
                                ? new Date(order.orderDate).toLocaleString()
                                : "N/A"
                        }
                    </p>

                    <p>
                        <strong>Status :</strong>
                        {" "}
                        {order.orderStatus}
                    </p>

                    <p>
                        <strong>Total Amount :</strong>
                        {" "}
                        ₹{order.totalAmount?.toLocaleString()}
                    </p>

                </div>

                {/* Ordered Products */}
                <div className="section">

                    <h3>Ordered Items</h3>

                    {
                        order.orderItems?.map((item) => (

                            <div
                                className="product-item"
                                key={item.orderItemId}
                            >
                                <p>
                                    <strong>
                                        {item.laptopName}
                                    </strong>
                                </p>

                                <p>
                                    Qty : {item.quantity}
                                </p>

                                <p>
                                    Unit Price :
                                    ₹{item.unitPrice}
                                </p>

                                <p>
                                    Subtotal :
                                    ₹{item.subtotal}
                                </p>
                            </div>

                        ))
                    }

                </div>

                {/* Payment */}
                <div className="section">

                    <h3>Payment Details</h3>

                    <p>
                        <strong>Method :</strong>
                        {" "}
                        {order.payment?.paymentMethod || "N/A"}
                    </p>

                    <p>
                        <strong>Status :</strong>
                        {" "}
                        {order.payment?.paymentStatus || "SUCCESS"}
                    </p>

                    <p>
                        <strong>Transaction ID :</strong>
                        {" "}
                        {order.payment?.transactionId || "N/A"}
                    </p>

                </div>

                <div className="delivery-msg">
                    🚚 Your order will be delivered soon.
                </div>

                <div className="buttons">

                    <button
                        className="track-btn"
                        onClick={() => navigate("/orders")}
                    >
                        Track Orders
                    </button>

                    <button
                        className="shop-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;