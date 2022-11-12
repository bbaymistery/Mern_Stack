import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

import Product from "./Product";
import axios from 'axios'
import Pagination from "react-js-pagination";
import "./pagination.css";
import productsImage from '../images/productsNoresult.png'
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat = "All", filters, sort, price, keyword = "", ratings = 0, }) => {
  //pagination normalda paginationList page de olmalidi
  //Sadece ora gyanda filteredCounts.llength ala bilemdik deye bura yazdirdiq Ona gorede locationnan istifade eledim
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCounts, setFilteredCounts] = useState(null)
  const [resultPerPage, setresultPerPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${cat}&ratings[gte]=${ratings}`
        //default olarak butun category leri gorsedir.
        //ana sehfede kategorye tikliyanda ise ona uygun kategorini gorsedir
        const res = await axios.get(link);
        setProducts(res.data.products);
        setresultPerPage(res.data.resultPerPage)
        setFilteredCounts(res.data.filteredProductsCount)
        // console.log("res", res);
      } catch (error) {
        console.log(error);

      }
    }
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, currentPage, keyword, price, ratings])

  useEffect(() => {
    // console.log(filters);//color: 'Black', size: 'M'
    // console.log(Object.entries(filters));// ['color', 'Black']

    //!importnant note
    //when category changes it effects directly our backend but when color changes it effect directly our clientside
    //we dont send any ..?color&red query to back end
    //burda eslinde color degisende yeniden filter edirik(filters icinde colorda valar)
    if (cat !== 'All') {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    } else {
      setFilteredProducts(products)
    }
  }, [cat, products, filters])
  useEffect(() => {
    if (sort === "newest") {
      //new Date("2022-10-23T13:52:07.884Z")
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    } else
      if (sort === "asc") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
      } else {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      }
  }, [sort]);
  return (
    <>

      <Container>
        {filteredProducts.length > 0
          ?
          filteredProducts.map((item, i) => (
            <Product item={item} key={i} rating={item.ratings} />
          ))
          :
          <div>
            <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
              There is No products</p>
            <img src={productsImage} alt="" />
          </div>

        }


      </Container>
      {//resultPerPage < filteredProducts.length &&
        resultPerPage && location.pathname !== '/' && filteredProducts.length > 0 && (
          <div className="paginationBox" style={{ display: 'flex', justifyContent: "center" }}>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={filteredCounts}
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
  );
};

export default Products;
