const ReviewsDAO = require("../dataAccesObject/reviewDAO");

const apiPostReview = async (req, res, next) => {
  /*
  postman ile asagindakini bu adrese gonderdik (http://localhost:5000/api/v1/restaurants/review)
  {

    "restaurant_id":"5eb3d668b31de5d588f4292a",
    "text":"Great foood",
    "user_id":"1234",
    "name":"Elgun"
}
  */
  try {
    const restaurantId = req.body.restaurant_id;
    const review = req.body.text;
    const userInfo = {
      name: req.body.name,
      _id: req.body.user_id,
    };
    const date = new Date();

    const ReviewResponse = await ReviewsDAO.addReview(
      restaurantId,
      userInfo,
      review,
      date
    );
    res.json({ status: "success", ReviewResponse });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const apiUpdateReview = async (req, res, next) => {
  //for editing we need object id(Onuda ilk once addreview edib ordan goturduk) Burda ise put request eledik  (http://localhost:5000/api/v1/restaurants/review)
  /*
{

    "review_id":"6287334feef3c46acf3d739d",    // burdaki id ilk once gonderdigimizin object id sidir
    "text":"bad foood",
    "user_id":"1234",
    "name":"Elgun"
}

  */
  try {
    const reviewId = req.body.review_id;
    const text = req.body.text;
    const date = new Date();
    const userId = req.body.user_id;

    const reviewResponse = await ReviewsDAO.updateReview(
      reviewId,
      userId,
      text,
      date
    );

    var { error } = reviewResponse;
    if (error) {
      res.status(400).json({ error });
    }

    if (reviewResponse.modifiedCount === 0) {
      throw new Error(
        "unable to update review - user may not be original poster"
      );
    }

    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const apiDeleteReview = async (req, res, next) => {
  //http://localhost:5000/api/v1/restaurants/review?id=6287334feef3c46acf3d739d

  /*
  {
    "user_id":"1234",
    "name":"Elgun"
}
  */
  try {
    const reviewId = req.query.id;
    // console.log(reviewId);

    const userId = req.body.user_id;
    // console.log(reviewId);
    const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  apiPostReview,
  apiUpdateReview,
  apiDeleteReview,
};
