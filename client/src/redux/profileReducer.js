import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        isUpdated: null,
        isFetching: false,
        error: false,
        //my profile
        isFetchingMyprofile: false,
        isErrorMyProfile: false,
        myProfile: null,
        myProfileStatus: null
    },
    reducers: {
        updateProfileStart: (state) => {
            state.isFetching = true;
        },
        updateProfileSuccess: (state) => {
            state.isFetching = false;
            state.isUpdated = true;
        },
        updateProfileFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        getMyProfileInformationStart: (state) => {
            state.isFetchingMyprofile = true;
        },
        getMyProfileInformationSuccess: (state, action) => {
            state.isFetchingMyprofile = false;
            state.myProfile = action.payload
            state.myProfileStatus = true
            state.isUpdated = null
        },
        getMyProfileInformationFailure: (state, action) => {
            state.isFetching = false;
            state.isErrorMyProfile = action.payload;
        },


        updatePasswordStart: (state) => {
            state.isFetching = true;
        },
        updatePasswordSuccess: (state) => {
            state.isFetching = false;
            state.isUpdated = true;
        },
        updatePasswordFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            console.log(action.payload);

        },

        clearErrorUpdateProfile: (state) => {
            state.error = false
        },
        logoutProfile: (state) => {
            state.myProfile = null
            state.myProfileStatus = null
        }
    },
});

export const {
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
    getMyProfileInformationFailure,
    getMyProfileInformationSuccess,
    getMyProfileInformationStart,
    logoutProfile,
    updatePasswordStart,
    updatePasswordSuccess,
    updatePasswordFailure,
    clearErrorUpdateProfile
} = profileSlice.actions;
export default profileSlice.reducer;
