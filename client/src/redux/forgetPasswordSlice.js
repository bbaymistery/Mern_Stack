import { createSlice } from "@reduxjs/toolkit";


const forgetPassword = createSlice({
    name: "forgetPassword",
    initialState: {
        isFetching: false,
        error: false,
        message: ""
    },
    reducers: {
        forgetPasswordStart: (state) => {
            state.isFetching = true;
        },
        forgetPasswordSuccess: (state, action) => {
            state.isFetching = false;
            state.message = action.payload;
        },
        forgetPasswordFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        resetPasswordStart: (state) => {
            state.isFetching = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.isFetching = false;
            state.message = action.payload;
        },
        resetPasswordFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        clearErrorforgetPassword: (state) => {
            state.error = false
        },


    },
});

export const {
    forgetPasswordStart,
    forgetPasswordSuccess,
    forgetPasswordFailure,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure,
    clearErrorforgetPassword
} = forgetPassword.actions;
export default forgetPassword.reducer;
