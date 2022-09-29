import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";s
import ReactStars from "react-rating-stars-component";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />

      <p>{product.name}</p>

      <div>
        {/* <Rating {...options} />{" "} */}
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`${product.price} $`}</span>
    </Link>
  );
};

export default ProductCard;
