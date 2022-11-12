/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import NoProductDefault from '../images/noProduct.png';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from "../redux/cartRedux";
import Carousel from "react-material-ui-carousel";
import './singleProduct.css'
import ReviewCard from "../components/ReviewCard";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { useAlert } from "react-alert";

import { clearErrorReview, newReviewReset } from "../redux/newRevieSlice";
import { createReview } from "../redux/apiCalls";
const Product = () => {

  const { id } = useParams();
  const dispatch = useDispatch()
  const alert = useAlert();
  const { success, error, loading } = useSelector((state) => state.newReview);
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleQuantity = (type) => {
    if (type === "des") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }
  const reviewSubmitHandler = () => {

    let myForm = { productId: id, rating, comment, }
    createReview(dispatch, myForm)
    setOpen(false);
  };
  const addItemToCard = () => {

    dispatch(
      addProduct({ ...product, quantity, color, size }));
  };
  const submitReviewToggle = () => open ? setOpen(false) : setOpen(true);

  const getProduct = async (par) => {
    try {
      const res = await publicRequest.get(`/product/${id}`);
      // console.log(res)
      setProduct(res.data.product);
      setColor(res.data.product.color[0])
      setSize(res.data.product.size[0])

    } catch (error) {

    }
  }
  useEffect(() => {
    getProduct()
  }, [])
  useEffect(() => {
    if (error) {
      dispatch(clearErrorReview());
      alert.error(error);
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch(newReviewReset());
    }
    getProduct()

  }, [dispatch, id, error, alert, success,]);
  console.log(product);
  return (
    <Container>
      <Navbar />
      <Announcement />
      {
        product ?
          <Wrapper>
            <div className="ProductDetails">
              <div>
                <Carousel className="carousel" >
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
            </div>
            <Rating style={{ position: 'absolute', left: '26%' }} precision={0.5} readOnly={true} value={product.ratings} />
            <InfoContainer>
              <Title>{product.name}</Title>
              <br />
              <hr />
              <br />

              <Price >Price: ${product.price}</Price>
              <FilterContainer>
                <Filter style={{
                  display: 'flex',
                  flexDirection: "column",
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'

                }}>
                  <FilterTitle style={{ marginBottom: "10px", display: 'flex', alignItems: 'center', }}> Selected Color
                    <FilterColor style={{ height: '10px', width: '10px', border: '1px solid black' }} color={color} /></FilterTitle>

                  <div style={{ display: 'flex', }}>
                    {
                      product.color.map((c, i) => {
                        return <FilterColor
                          style={{ border: '1px solid black' }}

                          key={i} color={c} onClick={() => setColor(c)}
                        />
                      })
                    }
                  </div>
                </Filter>

              </FilterContainer>

              <FilterContainer>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize style={{ cursor: 'pointer' }} onChange={(e) => setSize(e.target.value)}>
                    {
                      product.size.map((s, i) => {
                        return <FilterSizeOption key={i}>{s}</FilterSizeOption>
                      })
                    }
                  </FilterSize>
                </Filter>

              </FilterContainer>

              <p>
                InStock:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock}
                </b>
              </p>
              <br />
              <p>
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
              <br />
              <br />

              <AddContainer>
                <AmountContainer>
                  <Remove style={{ cursor: 'pointer' }} onClick={() => handleQuantity("des")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("inc")} style={{ cursor: 'pointer' }} />
                </AmountContainer>
                <Button onClick={addItemToCard}>ADD TO CART</Button>
              </AddContainer>
              <Desc>

                <span style={{ fontWeight: 'bold' }}>
                  Description:
                </span>
                <br />
                <br />
                {product.description}
              </Desc>
              <button onClick={submitReviewToggle} className="submitReview">{loading ? "Loading" : "Submit Review"}</button>
            </InfoContainer>

          </Wrapper> : ""
      }

      <h3 className="reviewsHeading" style={{ textAlign: "center" }}>REVIEWS</h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            size="large"
            value={rating.toString()}
            onChange={(e) => setRating(e.target.value)}
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
          <Button color="primary" onClick={reviewSubmitHandler} >Submit</Button>
        </DialogActions>
      </Dialog>

      {product?.reviews && product?.reviews[0] ? (
        <div className="reviews" style={{
          maxWidth: '1200px', margin: '0 auto', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          {product?.reviews &&
            product?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} img={review.userImage ? review.userImage : NoProductDefault} />
            ))}
        </div>
      ) : (
        <p className="noReviews" style={{ textAlign: "center" }}>
          <br />
          No Reviews Yet</p>
      )}
      <Footer />
    </Container>
  );
};

const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 110px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
  ;
  margin-top: 4.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImgContainer = styled.div`
  flex: 1;
display: flex;
align-items: center;
justify-content: center;
`;

const Image = styled.img`
  width: 60%;
  height: 300px;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
  color:black;
  font-family: 'Courier New', Courier, monospace;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: gray;
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 25px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;


export default Product;
