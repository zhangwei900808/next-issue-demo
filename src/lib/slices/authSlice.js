import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('/users/web/login', {
            userName: credentials.username,
            password: credentials.password
        });
        // Cookies.set('foo', 'bar')
        console.log('login response =', response)
        const resdata = response.data;
        if (resdata.status === 0) {
            return {
                isLogin: true,
                me: resdata.data
            };
        } else {
            return response.data || response.message
        }

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
