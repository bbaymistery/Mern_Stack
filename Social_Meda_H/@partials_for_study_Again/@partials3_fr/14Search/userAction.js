export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };
