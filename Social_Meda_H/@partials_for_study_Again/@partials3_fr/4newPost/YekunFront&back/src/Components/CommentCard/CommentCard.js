import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/PostAction";
import { getFollowingPosts } from "../../Actions/UserActions";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      // dispatch(getMyPosts());
    } else {
    }
    dispatch(getFollowingPosts());
  };
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
