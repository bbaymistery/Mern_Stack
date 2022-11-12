import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
const Product = ({ item, rating }) => {

  const [options, setoptions] = useState({
    readOnly: true,
    precision: 0.5,
    value: rating
  })


  useEffect(() => {
    setoptions((prev) => ({ ...prev, value: rating }))
  }, [rating])

  console.log(item, "por");
  return (
    <Container>
      <Price>{item.price}$ </Price>
      <div style={{ position: 'absolute', left: "10px", top: '30px', zIndex: 99999 }}>
        <Rating {...options} />{" "}
        <br />
        {
          `(${item.reviews
            .length} reviews)`
        }
      </div>
      <div style={{ position: 'absolute', zIndex: 999, fontWeight: 'bold', left: '50%', bottom: '10px', transform: "translateX(-50%)" }}>
        {item.name}
      </div>
      {/* <Circle /> */}
      <Image src={item.images[0].url} />
      <Info>
        <Icon>
          <Link to={`/cart`}>
            <ShoppingCartOutlined />
          </Link>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
      </Info>


    </Container>
  );
};

export default Product;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  //hover edende info Opcaity 1 olsun
  //Info containerin uzerinde olmalidi Calismasi icin
  &:hover ${Info}{
    opacity: 1;
  }
`;
const Price = styled.p`
position: absolute;
right: 20px;
top:20px;
font-size: 3rem;
color: green;
font-family: 'Courier New', Courier, monospace;
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;