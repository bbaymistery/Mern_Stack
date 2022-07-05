import axios from "axios";

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
