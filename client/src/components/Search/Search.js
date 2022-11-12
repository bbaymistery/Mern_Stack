import React, { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.css";
import Navbar from '../Navbar/index'
import axios from "axios";
import styled from "styled-components";
import Product from "../Product";
import Pagination from "react-js-pagination";
import productsImage from '../../images/productsNoresult.png'

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(null)
  const [resultPerPage, setresultPerPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // navigate(`/products/${keyword}`, { state: { fromSearch: true } });
      console.log("truim");

    }

  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        if (keyword.length > 0) {
          let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=All`
          //default olarak butun category leri gorsedir.
          //ana sehfede kategorye tikliyanda ise ona uygun kategorini gorsedir
          const res = await axios.get(link);
          setProducts(res.data.products);
          setresultPerPage(res.data.resultPerPage)
          setProductsCount(res.data.filteredProductsCount)
          console.log("res", res);
        } else {
          setProducts([]);

        }
      } catch (error) {
      }
    }
    getProducts()
  }, [keyword, currentPage])

  const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 996px;
    width: 100%;
    max-height: 400px;
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
    z-index: 99999999999;
`;

  return (
    <div style={{ background: 'rgb(246, 209, 209)', height: '100vh' }}>
      <Navbar />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product By Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />



      </form>
      {products.length > 0 ?
        <Container>
          {products.map((item, i) => (
            <Product item={item} key={i} rating={item.ratings} />
          ))}
        </Container>

        :
        <div style={{ display: 'flex', justifyContent: "center", marginTop: '3rem', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
            There is No products</p>
          <br />
          <img src={productsImage} alt="" style={{ width: "300px" }} />
        </div>

      }
      {//resultPerPage < filteredProducts.length &&
        products.length > 0 &&
        <div className="paginationBox"
          style={{
            display: 'flex',
            justifyContent: "center",
            marginTop: '2rem'
            // , height: '60px',
            // position: 'absolute',
            // left: '45%',
            // bottom: "-90px",
            // transform: "translateX(-50%)",
          }}>
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

      }

    </div>
  );
};

export default Search;
