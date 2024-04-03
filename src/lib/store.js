// "use client";

import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {authSlice} from "@/lib/slices/authSlice";
import {homeSlice} from "@/lib/slices/homeSlice";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [homeSlice.name]: homeSlice.reducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}