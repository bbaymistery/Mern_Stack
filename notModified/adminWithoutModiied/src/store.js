import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { darkLightModeReducer } from "./reducers/darkLightModeReducer";


const reducer = combineReducers({
    darkLight: darkLightModeReducer
})


const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
export default store;