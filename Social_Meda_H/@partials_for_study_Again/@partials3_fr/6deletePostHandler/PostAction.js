import axios from "axios";

//todo http://localhost:4000/api/v1/post/comment/62aafdfbea13aab38d2940a9
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: "DeletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeletePostFailure",
      payload: error.response.data.message,
    });
  }
};
