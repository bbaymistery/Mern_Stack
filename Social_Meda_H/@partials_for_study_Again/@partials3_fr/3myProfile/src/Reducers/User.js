import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
//

export const userReducer = createReducer(initialState, {
  //
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  //
  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  //getMyProfile
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    // console.log({ getLoaduser: "geMyProfile", ...action.payload });
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

//we have used for getting posts and display on homePage
export const postOfFollowingReducer = createReducer(initialState, {
  PostOfFollowingRequest: (state) => {
    state.loading = true;
  },
  PostOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  PostOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

//
export const allUsersReducer = createReducer(initialState, {
  AllUsersRequest: (state) => {
    state.loading = true;
  },
  AllUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  AllUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
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
