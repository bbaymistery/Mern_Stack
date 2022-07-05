const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//api/v1/post/upload
router.route("/post/upload").post(protect, createPost);

router.route("/post/:id").get(protect, likeAndUnlikePost);
router.route("/post/:id").put(protect, updateCaption);
router.route("/post/:id").delete(protect, deletePost);

router.route("/posts").get(protect, getPostOfFollowing);

router.route("/post/comment/:id").put(protect, commentOnPost);
router.route("/post/comment/:id").delete(protect, deleteComment); //:id =>postun id sidir

module.exports = router;
