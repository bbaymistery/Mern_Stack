import React, { useEffect, useState } from "react";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Navbar from '../../components/Navbar/index';
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, products: cartItems, totalPrice } = useSelector((state) => state.cart);

  const { myProfile: user } = useSelector((state) => state.profile)

  const [subTotal, setSubTotal] = useState('')
  const [tax, setTax] = useState('')
  const [shippingCharges, setShippingCharges] = useState('')
  const [totalPriceAfterCharges, setTotalPriceAfterCharges] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {

    setTax(totalPrice * 0.1)
    setSubTotal(totalPrice)
    let shipcarge = totalPrice > 1000 ? 0 : 20
    setShippingCharges(totalPrice > 1000 ? 0 : 20)
    setTotalPriceAfterCharges(totalPrice * 0.1 + shipcarge + totalPrice)
    setAddress(`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`)

  }, [shippingInfo.address, shippingInfo.city, shippingInfo.pinCode, shippingInfo.country, totalPrice, shippingInfo.state])



  const proceedToPayment = () => {
    const data = { subTotal, shippingCharges, tax, totalPriceAfterCharges, };
    //!sessionnnnnnnnnnnnnnnnnnnnnnn
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "Courier New" }}>Name:</p>
                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>{user.name}</span>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "Courier New" }}>Phone:</p>
                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "Courier New" }}>Address:</p>
                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item, i) => (
                    <div key={i} >
                      <img src={item.images[0].url ? item.images[0].url : ""} alt="Product" />
                      <Link to={`/product/${item.product}`} >
                        {item.name}
                      </Link>{" "}
                      <span style={{ display: 'flex', fontWeight: "bold", fontFamily: "Courier New" }}>
                        {item.quantity} X ${item.price} <b style={{ display: 'flex', fontWeight: "bold", fontFamily: "Courier New" }}>{`= ${item.price * item.quantity}`}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Order Summery</Typography>
              <div>
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "Courier New" }}>Subtotal:</p>
                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>${subTotal}</span>
                </div>
                <p style={{ fontSize: "14px", color: "red" }}>
                  If total price grater than 1000$ shippinhg charges 0
                  <br />
                  If not then 20$
                </p>
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "" }}>Shipping Charges:</p>

                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>${shippingCharges}</span>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", fontFamily: "Courier New" }}>TAX:(10%)</p>
                  <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>${tax}</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p style={{ fontWeight: "bold", fontFamily: "" }}>
                  <b>Total:</b>
                </p>
                <span style={{ fontWeight: "bold", fontFamily: "Courier New" }}>${totalPriceAfterCharges}</span>
              </div>

              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
