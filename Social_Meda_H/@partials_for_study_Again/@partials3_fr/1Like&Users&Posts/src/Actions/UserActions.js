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

      const { data } = await axios.get(`/api/v1/users`);
      // console.log(data);

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
