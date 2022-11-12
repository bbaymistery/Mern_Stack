import { Rating } from "@material-ui/lab";
import React from "react";

const ReviewCard = ({ review, img }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  // console.log(img);

  return (
    <div className="reviewCard" style={{ maxWidth: '400px' }}>
      <img src={img} alt="User" />
      <p>{review.name}</p>
      <br />
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
