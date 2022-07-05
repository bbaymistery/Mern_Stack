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
  forgotPassword,
  getMyPosts,
  getUserPosts,
  resetPassword,
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

router.route("/my/posts").get(protect, getMyPosts);
router.route("/userposts/:id").get(protect, getUserPosts);

router.route("/user/:id").get(protect, getUserDetails); //getUserProfile
router.route("/users").get(protect, getAllUsers);

router.route("/forgot/password").post(forgotPassword);

//forgot password ile gonderdigimiz linkin eynisini bunda yaziriq
// http://localhost:4000/api/v1/password/reset/6a7b39c8492a66224eea4a16f7e3f30b05830b99
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
