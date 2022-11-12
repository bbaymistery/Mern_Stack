import { configureStore } from "@reduxjs/toolkit"

import cartReducer from './cartRedux'
import userReducer from "./userRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileReducer from "./profileReducer";
import forgetPasswordSlice from "./forgetPasswordSlice";
import myOrdersSlice from "./orderSlice";
import newRevieSlice from "./newRevieSlice";
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer, profileReducer)
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: persistedReducer,
        profile: profileReducer,
        forgetPassword: forgetPasswordSlice,
        myOrders: myOrdersSlice,
        newReview: newRevieSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store)
