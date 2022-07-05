import axios from "axios";

//todo http://localhost:4000/api/v1/post/62aafe760cbbb7c8ab61f66
//like and Dislike
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LikeRequest",
    });
    // console.log(id);

    const { data } = await axios.get(`/api/v1/post/${id}`);
    console.log(data);

    dispatch({
      type: "LikeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LikeFailure",
      payload: error.response.data.message,
    });
  }
};
