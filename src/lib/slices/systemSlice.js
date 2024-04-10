import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/lib/axios";
export const getCommonUrls = createAsyncThunk('system/getCommonUrls', async (params, thunkAPI) => {
    try {
        const res = await axios.get(`/space/info/getCommonUrls`);
        // console.log('getCommonUrls res => ', res)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMsg: error.message});
    }
});


const initialState = {
    myTheme: 'default',
    loginMenus: [
        {
            key: '0',
            label: '首页',
            code: '',
            icon: '',
            url: '/',
            sort: 1,
            // 显示到哪，drawer-menus:抽屉，top-menus:菜单栏
            type: 'drawer-menus'
        },
        {
            key: '1',
            label: '网址推荐',
            code: '',
            icon: '',
            url: '/recommendUrls',
            sort: 1,
            // 显示到哪，drawer-menus:抽屉，top-menus:菜单栏
            type: 'drawer-menus'
        },
        {
            key: '3',
            label: '软件下载',
            code: '',
            icon: '',
            url: '/software',
            sort: 1,
            type: 'drawer-menus'
        },
        {
            key: '5',
            label: '技术热榜',
            code: '',
            icon: '',
            url: '/square',
            sort: 1,
            type: 'drawer-menus'
        },
        {
            key: '6',
            label: '新闻广场',
            code: '',
            icon: '',
            url: '/techNews',
            sort: 1,
            type: 'drawer-menus'
        },
        // {
        //   key: '7',
        //   label: '博客营地',
        //   code: '',
        //   icon: '',
        //   url: '/blogs',
        //   sort: 1,
        //   type: 'drawer-menus'
        // },
        {
            key: '8',
            label: '客服电话',
            code: '',
            icon: '',
            url: '/hotline',
            sort: 1,
            type: 'drawer-menus'
        },
        // {
        //   key: '9',
        //   label: '直播带货',
        //   code: '',
        //   icon: '',
        //   url: '/blogs',
        //   sort: 1,
        //   type: 'drawer-menus'
        // },
        {
            key: '4',
            label: '关于',
            code: '',
            icon: '',
            url: '/about',
            sort: 1,
            type: 'drawer-menus'
        }
    ],
    logoutMenus: [{
        key: '0',
        label: '首页',
        code: '',
        icon: '',
        url: '/',
        sort: 1,
        // 显示到哪，drawer-menus:抽屉，top-menus:菜单栏
        type: 'drawer-menus'
    }, {
        key: '1',
        label: '网址推荐',
        code: '',
        icon: '',
        url: '/recommendUrls',
        sort: 1,
        type: 'top-menus'
    },
        {
            key: '3',
            label: '软件下载',
            code: '',
            icon: '',
            url: '/software',
            sort: 1,
            type: 'top-menus'
        }, {
            key: '4',
            label: '关于',
            code: '',
            icon: '',
            url: '/about',
            sort: 1,
            type: 'top-menus'
        }],
    defaultTheme: {
        background: '#fff',
        color: '#000',
        primary: '#54458a'
    },
    darkTheme: {
        background: '#22272E',
        color: '#fff',
        primary: '#22272E'
    }
};

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setMyTheme: (state, action) => {
            state.myTheme = action.payload
        }
    },
})

export const { setMyTheme } = systemSlice.actions;
