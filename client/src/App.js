import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import SingleProduct from "./pages/SingleProduct";
import Search from './components/Search/Search'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword/UpdatePssword";
import Loader from "./components/Loader/Loader";
import About from './pages/About/About'
import { getMyProfileInfromation } from "./redux/apiCalls";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import MyOrders from "./pages/MyOrders/MyOrders";
import './App.css';
import OrderDetails from "./pages/OrderDetails/OrderDetail";
import ConfirmOrder from './pages/ConfirmOrder/ConfirmOrder'
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Success from "./pages/Success";

function App() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const [userLogged, setUserLogged] = useState(false)
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    console.log(data);

  }
  useEffect(() => {
    getStripeApiKey();
  }, [])

  useEffect(() => {
    if (currentUser) {
      setUserLogged(true)
    } else {
      setUserLogged(false)
    }
  }, [currentUser])
  useEffect(() => {
    getMyProfileInfromation(dispatch)
  }, [dispatch])
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  console.log(userLogged);

  return (

    <div>
      {/* {currentUser ? <Loader /> : ""} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={userLogged ? <Profile /> : <Navigate to="/" />} />
          <Route path="/me/update" element={userLogged ? <UpdateProfile /> : <Navigate to="/" />} />

          <Route path="/login" element={userLogged ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={userLogged ? <Navigate to="/" /> : <Register />} />

          <Route path="/password/update" element={userLogged ? <UpdatePassword /> : <Navigate to="/" />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/orders/me" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={
            userLogged ? <ConfirmOrder /> : <Login />
          } />
          {/* <Route path="/process/payment" element={<Payment />} /> */}

          {userLogged && stripeApiKey ? (
            <Route path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>} />
          ) :
            <Route path="/" element={<Login />} />
          }

          {/* {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
            </Elements>
          )} */}

          <Route path="/success" element={<Success />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
