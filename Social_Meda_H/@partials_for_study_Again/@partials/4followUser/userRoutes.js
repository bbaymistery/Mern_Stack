const express = require("express");
const {
  registerUser,
  loginUser,
  followUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//api/v1/post/upload
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/follow/:id").get(protect, followUser);

module.exports = router;
