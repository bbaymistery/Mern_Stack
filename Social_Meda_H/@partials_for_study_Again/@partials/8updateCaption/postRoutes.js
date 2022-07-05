const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//api/v1/post/upload
router.route("/post/upload").post(protect, createPost);

router.route("/post/:id").get(protect, likeAndUnlikePost);
router.route("/post/:id").put(protect, updateCaption);
router.route("/post/:id").delete(protect, deletePost);

router.route("/posts").get(protect, getPostOfFollowing);

/*
bir baska yazilis terzi

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);
*/
module.exports = router;
