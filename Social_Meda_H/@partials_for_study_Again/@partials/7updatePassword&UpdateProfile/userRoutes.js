const express = require("express");
const {
  registerUser,
  loginUser,
  followUser,
  logoutUser,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//api/v1/post/upload
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/follow/:id").get(protect, followUser);
router.route("/update/password").put(protect, updatePassword);
router.route("/update/profile").put(protect, updateProfile);
module.exports = router;
