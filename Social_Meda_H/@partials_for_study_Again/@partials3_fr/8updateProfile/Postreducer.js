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

  //
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
