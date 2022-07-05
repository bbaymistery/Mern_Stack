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
