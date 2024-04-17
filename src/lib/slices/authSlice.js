import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/lib/axios";

export const isReadNotify = createAsyncThunk('auth/isReadNotify', async (params, thunkAPI) => {
    try {
        const res = await axios.get(`/notify/crud/messages/isRead`);
        console.log('------------ isReadNotify res=>', res)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMsg: error.message});
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (params, thunkAPI) => {
    try {
        const res = await axios.get('/users/crud/refreshToken');
        // console.log('refreshCookie = ',res)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMsg: error.message});
    }
});

const initialState = {
    value: 0,
    isReadMessage: true,
    isReadRemind: true
};

export const authSlice = createSlice({
    name: "auth",
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
    extraReducers: (builder) => {
        builder.addCase(isReadNotify.fulfilled, (state, action) => {
            console.log('isReadNotify.fulfilled=>', action)
            if (action.payload && action.payload.data) {
                state.isReadMessage = action.payload.data.readMessage;
                state.isReadRemind = action.payload.data.readRemind;
            }
        })
        .addCase(isReadNotify.rejected, (state, action) => {
            console.log('isReadNotify rejected=>', state)
        })
    }
})

export const { increment, decrement, incrementByAmount } = authSlice.actions;
