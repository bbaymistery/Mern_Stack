import axios from "axios";

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
