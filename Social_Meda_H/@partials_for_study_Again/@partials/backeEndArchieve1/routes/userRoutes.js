const express = require("express");
const {
  registerUser,
  loginUser,
  followUser,
  logoutUser,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  getMyProfile,
  getUserDetails,
  getAllUsers,
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
router.route("/delete/me").delete(protect, deleteMyProfile);
router.route("/me").get(protect, getMyProfile);
router.route("/user/:id").get(protect, getUserDetails);
router.route("/users").get(protect, getAllUsers);
module.exports = router;
