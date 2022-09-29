import { useEffect, useState } from "react";
import "./App.css";
import WebFont from "webfontloader";
import Footer from "./components/layouts/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/layouts/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import UserOptions from "./components/Navbar/UserOptions";
import Account from "./components/User/Account";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Navbar from "./components/Navbar/";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePssword from "./components/User/UpdatePssword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from './components/admin/Dashboard.js'
import ProductList from './components/admin/ProductList.js'
import NewProduct from './components/admin/NewProduct.js'
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReview from "./components/admin/ProductReview";
import Contact from './components/layouts/Contact/Contact';
import About from './components/layouts/About/About';
import NotFound from './components/layouts/NotFound/NotFound';
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getStripeApiKey();
    store.dispatch(loadUser());
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="app" style={{ position: "relative" }}>
      <Router>
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path={`${window.location.pathname === "/process/payment" ? null : "*"}`} element={<NotFound />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<ProtectedRoute>   <Account />   </ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute> <UpdateProfile />  </ProtectedRoute>} />
          <Route path="/password/update" element={<ProtectedRoute>  <UpdatePssword />  </ProtectedRoute>} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ProtectedRoute>   <Shipping />   </ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute> <ConfirmOrder />  </ProtectedRoute>}
          />
          {stripeApiKey && (
            <Route path="/process/payment"
              element={<Elements stripe={loadStripe(stripeApiKey)}>  <ProtectedRoute>  <Payment /> </ProtectedRoute>  </Elements>} />
          )}

          <Route path="/success" element={<ProtectedRoute> <OrderSuccess />  </ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute>  <MyOrders />  </ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /> </ProtectedRoute>} />
          <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /> </ProtectedRoute>} />
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /> </ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /> </ProtectedRoute>} />
          <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /> </ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /> </ProtectedRoute>} />
          <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /> </ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReview /> </ProtectedRoute>} />

        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
