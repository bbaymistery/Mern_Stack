import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
// import { createOrder, clearErrors } from "../../actions/orderAction";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { clearErrorGetSingleOrder, createOrderSuccess } from "../../redux/orderSlice";
import { clearCart } from "../../redux/cartRedux";
import { createOrder } from "../../redux/apiCalls";
import Navbar from '../../components/Navbar/index';
const Payment = () => {
  const [paymentData, setPaymentData] = useState('')
  const [order, setOrder] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const [loading, setLoading] = useState(false);
  const { shippingInfo, products: cartItems } = useSelector((state) => state.cart);
  const { myProfile: user } = useSelector((state) => state.profile)

  const { errorCreateOrder: error } = useSelector((state) => state.myOrders);

  console.log(order);

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    setLoading(true);
    try {
      const config = { headers: { "Content-Type": "application/json", }, };
      // console.log(paymentData, "/api/v1/payment/process");

      const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
      // console.log(data, "Data");


      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      //
      // console.log(result, "result");

      if (result.error) {
        payBtn.current.disabled = false;
        // console.log(result);
        alert.error(result.error.message);

        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrderSuccess(order));
          console.log(order, "ORdder after success");
          let neworderItems = order.orderItems.map((order) => {
            return {
              name: order.name,
              price: order.price,
              quantity: order.quantity,
              image: order.images[0].url,
              size: order.size,
              product: order._id
            }
          })
          //MAPING ORDERiTEMS FOR orderModel
          let finalOrder = order
          finalOrder = { ...finalOrder, orderItems: [...neworderItems] }
          console.log(finalOrder, "finaOrder");
          console.log(neworderItems, "neworderItems");
          createOrder(dispatch, finalOrder)
          navigate("/success");
          dispatch(clearCart())
          setLoading(false);
        } else {
          alert.error("There's some issue while processing payment ");
          setLoading(false);

        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error?.response?.data?.message);
      setLoading(false);
      console.log(error);
    }
  };

  // console.log(error);

  useEffect(() => {
    let totalPriceOrderIfon = JSON.parse(sessionStorage.getItem("orderInfo")).totalPriceAfterCharges
    setPaymentData({ amount: Math.round(totalPriceOrderIfon * 100) })
  }, [])

  useEffect(() => {
    let orderInfo = (JSON.parse(sessionStorage.getItem("orderInfo")))//session storageden getrb OrderiNFONU SEToRDER ICINDE ISLETDIK
    console.log(orderInfo);

    setOrder({
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subTotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPriceAfterCharges,
    })//eger payment success olarsa  Order icine paymentInfo eklenilir
  }, [cartItems, shippingInfo,])

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorGetSingleOrder());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <p style={{ fontSize: "18px", borderBottom: "1px solid gray", textAlign: 'center' }}>
            Stripe Payment
            <br />
            <br />
            <span>4242 4242 4242 4242 _Test card number</span>
          </p>
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>

            <input
              type="submit"
              value={
                loading
                  ? "Loading.."
                  : `Pay- $${JSON.parse(sessionStorage.getItem("orderInfo")) && JSON.parse(sessionStorage.getItem("orderInfo")).totalPriceAfterCharges}`
              }
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
