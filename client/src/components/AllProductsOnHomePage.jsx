import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios'
import Pagination from "react-js-pagination";
import "./pagination.css";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const AllProductsOnHomePage = () => {
    //pagination normalda paginationList page de olmalidi
    //Sadece ora gyanda filteredCounts.llength ala bilemdik deye bura yazdirdiq Ona gorede locationnan istifade eledim
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(null)
    const [resultPerPage, setresultPerPage] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                let link = `/api/v1/products?page=${currentPage}&category=All`;
                const res = await axios.get(link);
                setProducts(res.data.products);
                setresultPerPage(res.data.resultPerPage)
                setProductsCount(res.data.productsCount)
                // console.log("res", res);
            } catch (error) {
                console.log(error);

            }
        }
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])



    return (
        <div style={{ maxWidth: '996px', margin: '0 auto' }}>
            <Container>
                {products.map((item, i) => (
                    <Product item={item} key={i} rating={item.ratings} />
                ))}
            </Container>
            {//resultPerPage < filteredProducts.length &&
                resultPerPage && (
                    <div className="paginationBox" style={{ display: 'flex', justifyContent: "center" }}>
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
        </div>
    );
};

export default AllProductsOnHomePage;
