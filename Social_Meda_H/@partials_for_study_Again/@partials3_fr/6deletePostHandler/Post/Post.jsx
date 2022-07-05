import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/PostAction";
import {
  getFollowingPosts,
  getMyPosts,
  loadUser,
} from "../../Actions/UserActions";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const handleClick = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
    }
    dispatch(getFollowingPosts());
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      dispatch(getMyPosts());
      // console.log("Bring my posts ");
    } else {
    }
    dispatch(getFollowingPosts());
    setCommentValue("");
    // setCommentToggle(!commentToggle);
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  //*NEW
  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    //bu eger biz bunu like lemisikse ,veriler baslangicda gelende otomatik liked true edirik
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          padding: "0px 5px",
        }}
      >
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "2vmax",
            width: "2vmax",
          }}
        />
        {/* //!controllerde =>getUserDetails */}
        <Link
          to={`/user/${ownerId}`}
          style={{
            paddingRight: "14px",
          }}
        >
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center", padding: "0px 0px" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 5px",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleClick}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        {/* //*NEWWWWW */}
        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
      {/* //!likesssssss */}
      <Dialog
        open={likesUser}
        onClose={() => setLikesUser(!likesUser)}
        style={{
          display: "flex",
          justifyContent: "center",
          overflow: "scroll",
        }}
      >
        <div className="DialogBox">
          <Typography variant="h4">Liked by </Typography>
          {likes.map((like) => {
            return (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            );
          })}
        </div>
      </Dialog>
      {/* //!commentssssss */}
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>
      {/* //!captionsss*/}
      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
