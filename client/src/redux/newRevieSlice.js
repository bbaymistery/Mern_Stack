import { createSlice } from "@reduxjs/toolkit";


const newReview = createSlice({
    name: "orders",
    initialState: {
        loading: false,
        success: "",
        error: false,
    },
    reducers: {
        //*Get my orders
        addNewReviewStart: (state) => {
            state.loading = true;
        },
        addNewReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        addNewReviewFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrorReview: (state) => {
            state.error = false
        },
        newReviewReset: (state) => {
            state.success = false
        }
    },
});

export const {
    addNewReviewStart,
    addNewReviewSuccess,
    addNewReviewFailure,
    clearErrorReview,
    newReviewReset
} = newReview.actions;
export default newReview.reducer;
