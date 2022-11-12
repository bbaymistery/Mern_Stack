import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addProductInsideShoppingCart, delteCompleCartItem } from "../redux/cartRedux";
import DeleteIcon from '@mui/icons-material/Delete';
const Cart = () => {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const addItemToCard = (type, id, productColor, size, index) => {
    dispatch(addProductInsideShoppingCart({ type, id, productColor, size, index }))
  }

  const deleteItem = (index, quantity) => {
    dispatch(delteCompleCartItem({ index, quantity }))
  }
  console.log(cart);
  return (
    <>
      <Navbar />
      {
        cart.products.length > 0 ? <Container>
          <Announcement />
          <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
              <TopButton>
                <Link to="/">
                  CONTINUE SHOPPING
                </Link>
              </TopButton>
              <TopTexts>
              </TopTexts>
              <TopButton type="filled" style={{ background: "#fff", border: '1px solid black', textDecoration: "none" }}>

                <Link style={{ background: "#fff", textDecoration: "none" }} to="/shipping">
                  CHECKOUT NOW
                </Link>
              </TopButton>
            </Top>
            <Bottom style={{ position: 'relative' }}>

              <Info>
                {cart.products.map((product, i) => (
                  <Product key={i}>
                    <ProductDetail>
                      <Image src={product.images[0].url} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                        <div >
                          <Rating readOnly={true} value={product.ratings} />{" "}

                        </div>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add
                          onClick={() => addItemToCard("inc", product._id, product.color, product.size, i)}
                          style={{ cursor: 'pointer' }} />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove
                          onClick={() => addItemToCard("des", product._id, product.color, product.size, i)}
                          style={{ cursor: 'pointer' }} />
                      </ProductAmountContainer>
                      <ProductPrice>
                        {`${product.price} * ${product.quantity} = ${product.price * product.quantity} $ `}
                      </ProductPrice>
                    </PriceDetail>
                    <div style={{ position: 'relative', marginTop: '1rem', marginRight: '1rem' }}>
                      <DeleteIcon onClick={() => deleteItem(i, product.quantity)} style={{ color: 'red', cursor: 'pointer' }}></DeleteIcon>
                    </div>
                  </Product>
                ))}
                <Hr />

              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
                </SummaryItem>

                <SummaryItem>
                  <SummaryItemText>Shipping </SummaryItemText>
                  <SummaryItemPrice>10%</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {

                    cart.totalPrice > 200 ? cart.totalPrice : cart.totalPrice + cart.totalPrice * 0.1

                  }</SummaryItemPrice>
                </SummaryItem>
                <Link to="/shipping" style={{ textDecoration: "none" }}>
                  <Button>CHECKOUT NOW</Button>
                </Link>


                <div style={{ marginTop: "3rem" }}>

                  *More than <span
                    style={{
                      color: 'red',
                      fontWeight: 'bold',

                    }}>200$</span>
                  shipping is free
                </div>
              </Summary>
            </Bottom>
          </Wrapper>
        </Container> :

          <div style={{ marginTop: '15rem', textAlign: 'center', color: 'red', fontWeight: "bold", fontSize: "24px" }}>

            <Link to="/">
              Go to add products
            </Link>
          </div>
      }

    </>
  );
};
const Container = styled.div`
max-width: 1222px;
width: 100%;
margin: 0 auto;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
;
margin-top: 6rem;

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  cursor: pointer;
  font-weight: bold;
  margin: 0px 15px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
  gap: 2rem;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ;
  /* width: 200px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 1rem;
  height: 200px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  object-fit:fill;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 40vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



export default Cart;
