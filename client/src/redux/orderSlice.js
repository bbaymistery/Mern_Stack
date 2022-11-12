import { createSlice } from "@reduxjs/toolkit";


const myOrdersSlice = createSlice({
    name: "orders",
    initialState: {
        isFetchingMyOrders: false,
        errorMyOrders: false,
        myorders: "",
        //order details
        isFetchingGetSingleOrder: false,
        errorGetSingleOrder: false,
        orderDetails: "",

        //
        isFetchingCreateOrder: false,
        errorCreateOrder: false,
        orderCreateOrderDetails: ""
    },
    reducers: {
        //*Get my orders
        getMyOrdersStart: (state) => {
            state.isFetchingMyOrders = true;
        },
        getMyOrdersSuccess: (state, action) => {
            state.isFetchingMyOrders = false;
            state.myorders = action.payload;
        },
        getMyOrdersFailure: (state, action) => {
            state.isFetchingMyOrders = false;
            state.errorMyOrders = action.payload;
        },
        clearErrorMyorders: (state) => {
            state.errorMyOrders = false
        },
        //*Get sindle order
        getOrderDetailStart: (state) => {
            state.isFetchingGetSingleOrder = true;
        },
        getOrderDetailSuccess: (state, action) => {
            state.isFetchingGetSingleOrder = false;
            state.orderDetails = action.payload;
        },
        getOrderDetailFailure: (state, action) => {
            state.isFetchingGetSingleOrder = false;
            state.errorGetSingleOrder = action.payload;
        },
        clearErrorGetSingleOrder: (state) => {
            state.errorGetSingleOrder = false
        },

        //*Create order
        createOrderStart: (state) => {
            state.isFetchingCreateOrder = true;
        },
        createOrderSuccess: (state, action) => {
            state.isFetchingCreateOrder = false;
            state.orderCreateOrderDetails = action.payload;
        },
        createOrderFailure: (state, action) => {
            state.isFetchingCreateOrder = false;
            state.orderCreateOrderDetails = action.payload;
        },
        clearErrorCreateOrder: (state) => {
            state.orderCreateOrderDetails = false
        },


        //

    },
});

export const {
    getMyOrdersStart,
    getMyOrdersSuccess,
    getMyOrdersFailure,
    getOrderDetailStart,
    getOrderDetailSuccess,
    getOrderDetailFailure,
    clearErrorMyorders,
    clearErrorGetSingleOrder,
    createOrderStart,
    createOrderSuccess,
    createOrderFailure,
    clearErrorCreateOrder
} = myOrdersSlice.actions;
export default myOrdersSlice.reducer;
