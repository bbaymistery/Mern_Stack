import "./Products.css";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../layouts/Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader/Loader";
import { useParams } from "react-router-dom";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",

];

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    products,
    loading,
    error,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  let count = productsCount;
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    console.log(products);
    let lessPrice = price[0];
    let greatPrice = price[1];
    let filteredproducts = products.filter((pr) => {
      return lessPrice < pr.price && greatPrice > pr.price;
    });
    setFilteredProducts(filteredproducts);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, alert, keyword, currentPage]);
  console.log(filteredProducts);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      {loading && filteredProducts.length === 0 ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            &nbsp;
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            &nbsp;
            <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
