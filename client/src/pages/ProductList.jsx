import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import CategoryProducts from "../components/CategoryProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useParams } from "react-router";
import { useState } from "react";
import Slider from "@material-ui/core/Slider";
const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const [price, setPrice] = useState([0, 100]);
    const [ratings, setRatings] = useState(0);

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({ ...filters, [e.target.name]: value, });
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    return (
        <Container style={{ marginTop: '2rem' }}>
            <Navbar />
            <Announcement />
            <Title styles={{ color: 'red', textTransform: "capitalize" }}>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled >
                            Color
                        </Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>green</Option>
                        <Option>black</Option>
                        <Option>white</Option>
                        <Option>yellow</Option>
                    </Select>


                    <Select name="size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Price 0-100</FilterText>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={100}
                    />
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>

                </Filter>
                <Filter>
                    <FilterText >Ratings 0 -5 </FilterText>
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
                </Filter>
            </FilterContainer>

            <div style={{ maxWidth: '996px', margin: "0 auto" }}>
                <CategoryProducts cat={cat} filters={filters} sort={sort} price={price} ratings={ratings} />
            </div>
            {/* <Newsletter /> */}


            <Footer />
        </Container>
    );
};

export default ProductList;

const Container = styled.div`

`;

const Title = styled.h1`
  margin: 20px;
  color: red;
  text-transform: capitalize;
  text-align: center;
  margin-top: 3rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 5rem;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
