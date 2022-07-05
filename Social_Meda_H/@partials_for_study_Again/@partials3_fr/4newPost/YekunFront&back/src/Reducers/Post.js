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

  //
  //
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
