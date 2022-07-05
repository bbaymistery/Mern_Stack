import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useLocation, useParams } from "react-router-dom";

const AddReview = (props) => {
  let initialReviewState = "";

  let editing = false;
  const location = useLocation();
  if (location?.state && location?.state?.currentReview) {
    editing = true;
    initialReviewState = location?.state?.currentReview?.text;
  }

  const params = useParams();
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      name: props.user.name,
      user_id: props.user.id,
      text: review,
      restaurant_id: params.id,

      /*
      "restaurant_id":"5eb3d668b31de5d588f4292a",
    "text":"BADDDD foood again again",
    "user_id":"123456789",
    "name":"Elgun"
      */
    };

    if (editing) {
      data.review_id = location.state.currentReview._id; //data ya yeni deger atyrg(Uppdate edende controllerden req.body.review id seklinde reviewId alb  mongoDbye gonderir)

      /*

      {

    "review_id":"6287334feef3c46acf3d739d",
    "text":"bad foood",
    "user_id":"1234",
    "name":"Elgun"
}
      */
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + params.id}
                className="btn btn-success"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                {editing ? "Edit" : "Create"} Review
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
