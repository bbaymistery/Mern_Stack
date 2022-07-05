import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/UserActions";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";

import { useAlert } from "react-alert";
import User from "../User/User";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector(
    (state) => state.userProfile
  );
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const { message, loading: followLoading } = useSelector(
    (state) => state.like
  );

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    if (me._id === params.id) {
      setMyProfile(true);
    }

    //*bununiye yazdi anlamadim
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, error, message, dispatch]);
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts?.map((post, i) => {
            return (
              <Post
                key={i}
                postImage={post?.image?.url}
                caption={post?.caption}
                isDelete={myProfile}
                postId={post?._id}
                likes={post?.likes}
                comments={post?.comments}
                ownerImage={post?.owner.avatar?.url}
                ownerId={post?.owner?._id}
                ownerName={post?.owner?.name}
              />
            );
          })
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button
                style={{ background: "#efefef" }}
                onClick={() => setFollowersToggle(!followersToggle)}
              >
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button
                style={{ background: "#efefef" }}
                onClick={() => setFollowingToggle(!followingToggle)}
              >
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers?.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
