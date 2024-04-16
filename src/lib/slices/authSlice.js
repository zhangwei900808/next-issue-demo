import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/lib/axios";

// export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
//     try {
//         const response = await axiosInstance.post('/users/web/login', {
//             userName: credentials.username,
//             password: credentials.password
//         });
//         console.log('login response =', response)
//         const resdata = response.data;
//         if (resdata.status === 0) {
//             return {
//                 isLogin: true,
//                 me: resdata.data
//             };
//         } else {
//             return response.data || response.message
//         }
//
//     } catch (error) {
//         return thunkAPI.rejectWithValue({errorMsg: error.message});
//     }
// });

export const refreshToken = createAsyncThunk('account/refreshToken', async (params, thunkAPI) => {
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
})

export const { increment, decrement, incrementByAmount } = authSlice.actions;
