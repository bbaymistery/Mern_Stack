import axios from "axios";

//todo loginUser http://localhost:4000/api/v1/login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const url = "/api/v1/login";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(url, { email, password }, config);
    // console.log(data);
    // console.log(email, password);

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data,
    });
  }
};

//todo getMyProfile =>http://localhost:4000/api/v1/me
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

//todo getFollowing Post  http://localhost:4000/api/v1/posts
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "PostOfFollowingRequest",
    });

    const { data } = await axios.get("/api/v1/posts");

    dispatch({
      type: "PostOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "PostOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/users
export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AllUsersRequest",
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);

      dispatch({
        type: "AllUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "AllUsersFailure",
        payload: error.response.data.message,
      });
    }
  };
//todo http://localhost:4000/api/v1//my/posts
//getMyPosts

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostsRequest",
    });

    const { data } = await axios.get("/api/v1/my/posts");

    dispatch({
      type: "MyPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostsFailure",
      payload: error.response.data.message,
    });
  }
};

//todo logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

//todo register

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = "/api/v1/register";
      const { data } = await axios.post(
        url,
        { name, email, password, avatar },
        config
      );
      console.log(data);

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

//todo http://localhost:4000/api/v1/update/profile
export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};
//todo http://localhost:4000/api/v1/update/password
export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

//todo http://localhost:4000/api/v1/delete/me
export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete("/api/v1/delete/me");

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/forgot/password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });
    const url = "/api/v1/forgot/password";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(url, { email }, config);
    console.log(data);

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//todo  http://localhost:4000/api/v1/password/reset/7700c01f9e2b5ad6a0e544881e89ea5ac21a6ab7
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/userposts/62aafab3f68713c1873da5db

//userPostsReducer(in post.js)
//todo http://localhost:4000/api/v1/userposts/62aafab3f68713c1873da5db
export const getUserPosts = (id) => async (dispatch) => {
  // console.log("s");

  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/user/62aafab3f68713c1873da5db
//controllerde=>getUserDetails =>userProfileReducer(in user.js )
export const getUserProfile = (id) => async (dispatch) => {
  // console.log("user");

  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/follow/62aafab3f68713c1873da5db
export const followAndUnfollowUser = (id) => async (dispatch) => {
  // console.log("follow");

  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
