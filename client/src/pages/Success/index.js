import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";

const Success = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearCart())
    localStorage.removeItem("cartItems")
  }, [dispatch])

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/me">View Orders</Link>
    </div>
  );
};

export default Success;
