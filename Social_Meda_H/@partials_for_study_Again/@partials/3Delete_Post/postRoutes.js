const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//api/v1/post/upload
router.route("/post/upload").post(protect, createPost);
router.route("/post/:id").get(protect, likeAndUnlikePost);
router.route("/post/:id").delete(protect, deletePost);

module.exports = router;
