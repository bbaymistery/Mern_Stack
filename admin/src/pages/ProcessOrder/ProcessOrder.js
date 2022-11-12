import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import "./processOrder.css";
import { UPDATE_ORDER_RESET } from "../../reducers/orderReducer/oderTypes";
import { getOrderDetails, updateOrder, clearErrors } from "../../reducers/orderReducer/oderAction";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const ProcessOrder = () => {
    const { id } = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.updateDeleteOrder);
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(id, myForm));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />

                    {
                        loading
                            ?
                            "loading"
                            :
                            <div className="dashboard">
                                <div className="newProductContainer" style={{ marginTop: '3rem' }}>
                                    <div className="confirmOrderPage" style={{ display: order?.orderStatus === "Delivered" ? "block" : "grid", }}  >
                                        <div style={{ background: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div className="confirmshippingArea">
                                                <h3 style={{ margin: "0x", padding: "0px" }}>Shipping Info</h3 >
                                                <div className="orderDetailsContainerBox" style={{ margin: "10px" }}>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <p style={{ fontWeight: 'bold' }}>Name:</p>

                                                        <span>{order.user && order.user.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <p style={{ fontWeight: 'bold' }}>Phone:</p>
                                                        <span>
                                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <p style={{ fontWeight: 'bold' }}>Address:</p>
                                                        <span >
                                                            {order.shippingInfo &&
                                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h3 style={{ margin: "0x", padding: "0px" }}>Payment</h3 >
                                                <div className="orderDetailsContainerBox" style={{ margin: "10px" }}>
                                                    <div>
                                                        <p
                                                            className={
                                                                order.paymentInfo &&
                                                                    order.paymentInfo.status === "succeeded"
                                                                    ? "greenColor"
                                                                    : "redColor"
                                                            }
                                                        >
                                                            {order.paymentInfo &&
                                                                order.paymentInfo.status === "succeeded"
                                                                ? "PAID"
                                                                : "NOT PAID"}
                                                        </p>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <p style={{ fontWeight: 'bold' }}>Amount:</p>
                                                        <span>{order.totalPrice && order.totalPrice}</span>
                                                    </div>
                                                </div>

                                                <h3 >Order Status</h3 >
                                                <div className="orderDetailsContainerBox" style={{ margin: "10px" }}>
                                                    <div>
                                                        <p
                                                            className={
                                                                order.orderStatus && order.orderStatus === "Delivered"
                                                                    ? "greenColor"
                                                                    : "redColor"
                                                            }
                                                        >
                                                            {order.orderStatus && order.orderStatus}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px", marginBottom: '10px' }} className="confirmCartItems">

                                                <div className="confirmCartItemsContainer" style={{ margin: "2rem" }}>
                                                    {order.orderItems &&
                                                        order.orderItems.map((item) => (
                                                            <div key={item.product} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                <img src={item.image} alt="Product" style={{ width: "150px" }} />
                                                                <br />
                                                                <Link to={`/product/${item.product}`}>
                                                                    {item.name}
                                                                </Link>{" "}
                                                                <span>
                                                                    {item.quantity} X ${item.price} ={" "}
                                                                    <b>${item.price * item.quantity}</b>
                                                                </span>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block", maxWidth: '1200px', margin: '0 auto' }}    >
                                            <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}   >
                                                <h1>Process Order</h1>
                                                <div>
                                                    <AccountTreeIcon />
                                                    <select onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="">Choose Category</option>
                                                        {order.orderStatus === "Processing" && (
                                                            <option value="Shipped">Shipped</option>
                                                        )}

                                                        {order.orderStatus === "Shipped" && (
                                                            <option value="Delivered">Delivered</option>
                                                        )}
                                                    </select>
                                                </div>

                                                <Button id="createProductBtn" type="submit" disabled={loading ? true : false || status === "" ? true : false}  >
                                                    Change Process
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;