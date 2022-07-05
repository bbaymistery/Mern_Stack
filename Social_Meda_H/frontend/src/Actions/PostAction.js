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
//todo http://localhost:4000/api/v1/post/comment/62aafdfbea13aab38d2940a9
//add or update comment
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
//del;ete comment
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

//todo http://localhost:4000/api/v1/post/62a6d8ca173ef469d8266c74
//!bunun reduceri updateCaption dir
export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateCaptionRequest",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `/api/v1/post/${id}`;
    const { data } = await axios.put(url, { caption }, config);
    console.log(data);

    dispatch({
      type: "UpdateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

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

//todo
