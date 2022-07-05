const express = require("express");
const router = express.Router();
const { apiGetRestaurants } = require("../controllers/restaurantController");
router.route("/").get(apiGetRestaurants);

module.exports = router;
