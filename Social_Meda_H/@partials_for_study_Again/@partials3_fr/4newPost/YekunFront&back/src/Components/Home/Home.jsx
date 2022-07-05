import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { getAllUsers, getFollowingPosts } from "../../Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { useAlert } from "react-alert";
import Account from "../Account/Account";
const Home = () => {
  const { error: likeError, message } = useSelector((state) => state.like);

  const { posts } = useSelector((state) => state.postOfFollowing);
  const { users, loading: usLoad } = useSelector((state) => state.allUsers);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, likeError, message, dispatch]);
  return usLoad === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {/* <Account /> */}
        {posts && posts.length > 0 ? (
          posts.map((post, i) => {
            return (
              <Post
                key={i}
                postImage={post.image?.url}
                caption={post.caption}
                isDelete={true}
                isAccount={true}
                postId={post._id}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar?.url}
                ownerId={post.owner._id}
                ownerName={post.owner.name}
              />
            );
          })
        ) : (
          <Typography>No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
