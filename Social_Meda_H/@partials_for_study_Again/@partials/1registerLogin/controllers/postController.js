const Post = require("../models/Post");
const User = require("../models/User");
const createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: " myCloud.public_id",
        url: "myCloud.secure_url",
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created 🤩",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createPost };
