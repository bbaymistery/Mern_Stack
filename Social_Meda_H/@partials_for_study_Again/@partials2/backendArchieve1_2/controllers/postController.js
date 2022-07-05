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
const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({
        success: false,
        message: "Post Not Found ",
      });
    //unlike process
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: ";Post unliked ",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post liked ",
      });
    }
    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    //hem postu remove edirem
    await post.remove();

    //hemde userin icindeki post arrayden silirem
    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    //
    res.status(200).json({
      success: true,
      message: `${post?.caption} // is deleted `,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;

    // Checking if comment already exists

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;

      await post.save();

      return res.status(200).json({
        success: true,
        messagee: "Comment updated !",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      // console.log(post);

      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete
    //commentId=>comes from client side
    //if i am owner of this post Ican delete which one i want I dont have any restriction
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted by owner of post ",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
};
