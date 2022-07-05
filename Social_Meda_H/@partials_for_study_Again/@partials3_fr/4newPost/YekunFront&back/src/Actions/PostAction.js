import axios from "axios";

//todo http://localhost:4000/api/v1/post/62aafe760cbbb7c8ab61f66
//like and Dislike
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LikeRequest",
    });

    const { data } = await axios.get(`/api/v1/post/${id}`);

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

//todo http://localhost:4000/api/v1/post/comment/62aafdfbea13aab38d2940a9
//addOrUpdateComment
export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "AddCommentRequest",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `/api/v1/post/comment/${id}`;
    const { data } = await axios.put(url, { comment }, config);
    console.log(data);

    dispatch({
      type: "AddCommentSuccess",
      payload: data.messagee,
    });
  } catch (error) {
    dispatch({
      type: "AddCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//todo  http://localhost:4000/api/v1/post/comment/62aafdfbea13aab38d2940a9
//delete comment
export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCommentRequest",
    });
    const url = `/api/v1/post/comment/${id}`;
    const { data } = await axios.delete(url, { data: { commentId } });
    dispatch({
      type: "DeleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//todo http://localhost:4000/api/v1/post/upload
//create post
export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "NewPostRequest",
    });
    const url = `/api/v1/post/upload`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(url, { caption, image }, config);
    console.log(data);

    dispatch({
      type: "NewPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "NewPostFailure",
      payload: error.response.data.message,
    });
  }
};
