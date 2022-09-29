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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Search from "./Search";
const categories = [
  "All",
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
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);
  const { state } = useLocation();
  const [keywordsearch, setKeywordSearch] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordsearch.trim()) {
      navigate(`/products/${keywordsearch}`, { state: { fromSearch: true } });
    } else {
      navigate("/products", { state: { fromSearch: true } });
    }
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredProductsCount;
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const changeCAtegory = (e, category) => {
    setCurrentPage(1);

    setCategory(category);
    setActiveCategory(category);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">
            {state?.fromSearch ? "Search " : ""}Products
          </h2>
          {state?.fromSearch ? (
            <form className="searchBoxx" onSubmit={searchSubmitHandler}>
              <a href="/products"> Go to Products </a>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Search a Product ..."
                  onChange={(e) => setKeywordSearch(e.target.value)}
                />
                <input className="btn" type="submit" value="Search" />
              </div>
            </form>
          ) : (
            ""
          )}

          <div className="products">
            {products &&
              products.map((product) => (
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
                  className={`category-link ${category === activeCategory ? "active-link" : ""
                    }`}
                  key={category}
                  onClick={(e) => changeCAtegory(e, category)}
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
                totalItemsCount={count}
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
