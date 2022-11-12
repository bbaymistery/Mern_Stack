import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { darkLightModeReducer } from "./reducers/darkLightModeReducer";
import { allUsersReducer, forgotPasswordReducer, updateDeleteUserReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { allOrdersReducer, orderDetailsReducer, updateDeleteOrderReducer } from "./reducers/orderReducer";
import { newProductReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productsReducer";


const reducer = combineReducers({
    products: productsReducer,
    darkLight: darkLightModeReducer,
    user: userReducer,
    forgetPassword: forgotPasswordReducer,
    allUser: allUsersReducer,
    userDetail: userDetailsReducer,
    updateDeleteUser: updateDeleteUserReducer,
    allorders: allOrdersReducer,
    updateDeleteOrder: updateDeleteOrderReducer,
    orderDetails: orderDetailsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
})


const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
export default store;