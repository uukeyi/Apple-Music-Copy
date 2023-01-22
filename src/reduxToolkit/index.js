import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceSignIn from "./slices/authSliceSignIn";
import authSliceSignUp from "./slices/authSliceSignUp";
import buySubscriptionSlice from "./slices/buySubscriptionSlice";
import dataSlice from "./slices/dataSlice";
import paginateDataSlice from "./slices/paginateDataSlice";
const rootReducer = combineReducers({
    authIn : authSliceSignIn,
    authUp : authSliceSignUp,
    getData : dataSlice,
    getPaginatedData : paginateDataSlice,
    buySubscription : buySubscriptionSlice,
})
export const store = configureStore({
    reducer : rootReducer
})