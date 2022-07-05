const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);

module.exports = router;
