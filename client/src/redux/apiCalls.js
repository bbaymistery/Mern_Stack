import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess
} from "./userRedux";
import {
  updateProfileFailure,
  updateProfileSuccess,
  updateProfileStart,
  getMyProfileInformationStart,
  getMyProfileInformationSuccess,
  getMyProfileInformationFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,

} from "./profileReducer";
import { publicRequest } from "../requestMethods";
import axios from "axios";
import {
  forgetPasswordFailure,
  forgetPasswordStart,
  forgetPasswordSuccess
} from "./forgetPasswordSlice";
import {
  getMyOrdersFailure,
  getMyOrdersStart,
  getMyOrdersSuccess,
  getOrderDetailStart,
  getOrderDetailSuccess,
  getOrderDetailFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure
} from "./orderSlice";
import { addNewReviewFailure, addNewReviewStart, addNewReviewSuccess } from "./newRevieSlice";
//   /login olmasin sebebi publicrequest dir
export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  console.log(user);

  try {
    const res = await publicRequest.post("/login", user);
    // console.log(res);
    dispatch(loginSuccess(res.data));
    navigate("/profile")
  } catch (err) {
    dispatch(loginFailure(err.message));
    console.log(err);

  }
};
export const register = async (dispatch, form, navigate) => {
  dispatch(registerStart());
  let config = { ...form.form }

  console.log(config, "config");

  try {
    const res = await publicRequest.post("/register", config);
    console.log(res);
    dispatch(registerSuccess(res.data));
    navigate("/login")
  } catch (err) {
    dispatch(registerFailure(err.response.data.message));
  }
};

// password
export const forgotPassword = async (dispatch, email) => {
  dispatch(forgetPasswordStart());
  try {
    const res = await publicRequest.post("/password/forgot", { email });
    console.log(res);
    dispatch(forgetPasswordSuccess(res.data.message));
  } catch (err) {
    dispatch(forgetPasswordFailure(err.message));
    console.log(err);

  }
};
export const resetPassword = async (dispatch, passwords, token, navigate) => {
  dispatch(forgetPasswordStart());
  let config = { ...passwords }

  try {
    const res = await axios.put(`/api/v1/password/reset/${token}`, config,);
    console.log(res);
    dispatch(forgetPasswordSuccess(res.data.message));
    navigate("/login")
  } catch (err) {
    dispatch(forgetPasswordFailure(err.message));

  }
};
export const updatePassword = async (dispatch, form, navigate) => {
  dispatch(updatePasswordStart());
  let config = { ...form }
  console.log(config);

  try {
    const res = await axios.put("/api/v1/password/update", config);
    console.log(res);
    // console.log(res.data);
    if (res.status === 200) {
      dispatch(updatePasswordSuccess());
      navigate("/profile")
    }

  } catch (err) {
    dispatch(updatePasswordFailure(err.message));
  }
};

// profile
export const updateProfile = async (dispatch, form, navigate) => {
  dispatch(updateProfileStart());

  let config = { ...form }
  try {
    const res =
      await axios.put("/api/v1/me/update", config);
    console.log(res);
    // console.log(config);


    if (res.status === 200) {
      dispatch(updateProfileSuccess());
      navigate("/profile")
    }
  } catch (err) {
    dispatch(updateProfileFailure(err.message));
    console.log(err);
  }
};

export const getMyProfileInfromation = async (dispatch) => {
  dispatch(getMyProfileInformationStart());
  try {
    const res =
      await axios.get("/api/v1/me", { withCredentials: true, });
    // console.log(res.data);
    if (res.status === 200) {
      dispatch(getMyProfileInformationSuccess(res.data.user));
    }
  } catch (err) {
    dispatch(getMyProfileInformationFailure(err.message));
    console.log(err);
  }
};

// orders
export const getMyOrders = async (dispatch) => {
  dispatch(getMyOrdersStart());
  try {
    const res =
      await axios.get("/api/v1/orders/me", { withCredentials: true, });
    console.log(res.data);

    dispatch(getMyOrdersSuccess(res.data.orders));

  } catch (err) {
    dispatch(getMyOrdersFailure(err.message));
    console.log(err);
  }
};
export const getSingleOrder = async (dispatch, id) => {
  dispatch(getOrderDetailStart());
  try {
    const res =
      await axios.get(`/api/v1/order/${id}`, { withCredentials: true, });
    console.log(res.data, "apicalss");

    dispatch(getOrderDetailSuccess(res.data.order));

  } catch (err) {
    dispatch(getOrderDetailFailure(err.message));
    console.log(err);
  }
};


export const createOrder = async (dispatch, order) => {
  dispatch(createOrderStart());
  console.log(order, "apicals");
  let config = { ...order }

  try {
    const res =
      await axios.post(`/api/v1/order/new`, config, { withCredentials: true, });
    console.log(res.data, "response apilcassss 1pi.v1.new.order");

    dispatch(createOrderSuccess(res.data));

  } catch (err) {
    dispatch(createOrderFailure(err.message));
    console.log(err.response.data.message);
  }
};
export const createReview = async (dispatch, review) => {
  dispatch(addNewReviewStart());
  let config = { ...review }
  console.log(config);

  try {
    const res =
      await axios.put(`/api/v1/review`, config, { withCredentials: true, });
    console.log(res);

    dispatch(addNewReviewSuccess(res.data.success));
  } catch (err) {
    dispatch(addNewReviewFailure(err.message));
    console.log(err);
  }
};
