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
