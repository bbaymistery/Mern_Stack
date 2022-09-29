import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder, } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import "./processOrder.css";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
    const { id } = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

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
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid", }}  >
                            <div style={{ background: "#fff", paddingLeft: "300px" }}>
                                <div className="confirmshippingArea">
                                    <h3 style={{ margin: "0x", padding: "0px" }}>Shipping Info</h3 >
                                    <div className="orderDetailsContainerBox" style={{ margin: "10px" }}>
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
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

                                        <div>
                                            <p>Amount:</p>
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
                                <div className="confirmCartItems">
                                    <h3 style={{ margin: "0x", padding: "0px" }}>Your Cart Items:</h3 >
                                    <div className="confirmCartItemsContainer" style={{ margin: "10px" }}>
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
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
                            <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block", }}    >
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
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;