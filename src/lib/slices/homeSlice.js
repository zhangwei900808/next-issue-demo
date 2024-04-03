import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: 0,
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
            console.log('increment state value = ', state.value)
        },
        decrement: (state) => {
            state.value -= 1;
            console.log('decrement state value = ', state.value)
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
})

export const { increment, decrement, incrementByAmount } = homeSlice.actions;
