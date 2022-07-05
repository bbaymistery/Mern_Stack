import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
  //!likes
  LikeRequest: (state) => {
    state.loading = true;
  },
  LikeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  LikeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!add comments
  AddCommentRequest: (state) => {
    state.loading = true;
  },
  AddCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  AddCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!delete comments
  DeleteCommentRequest: (state) => {
    state.loading = true;
  },
  DeleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!add new post (Create post)
  NewPostRequest: (state) => {
    state.loading = true;
  },
  NewPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  NewPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!update Caption
  UpdateCaptionRequest: (state) => {
    state.loading = true;
  },
  UpdateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!deletePost
  DeleteProfileRequest: (state) => {
    state.loading = true;
  },
  DeleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!updatre profile
  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!update password
  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!deleteProfile
  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!forgotPassword
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //!reset
  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //!follow

  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

//http://localhost:4000/api/v1//my/posts
export const myPostsReducer = createReducer(initialState, {
  MyPostsRequest: (state) => {
    state.loading = true;
  },
  MyPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  MyPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});

export const userPostsReducer = createReducer(initialState, {
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
