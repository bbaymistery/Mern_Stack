import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
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
  ClearErrors: (state) => {
    state.error = null;
  },

  ClearMessage: (state) => {
    state.message = null;
  },
});
