import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../MetaData";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerces" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading" id="container">
            Featured Products
          </h2>
          <div className="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
