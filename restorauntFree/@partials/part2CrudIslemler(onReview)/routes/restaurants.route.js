const express = require("express");
const router = express.Router();
const { apiGetRestaurants } = require("../controllers/restaurantController");
const {
  apiPostReview,
  apiUpdateReview,
  apiDeleteReview,
} = require("../controllers/reviewController");

router.route("/").get(apiGetRestaurants);

router.route("/review").post(apiPostReview);
router.route("/review").put(apiUpdateReview);
router.route("/review").delete(apiDeleteReview);
module.exports = router;
