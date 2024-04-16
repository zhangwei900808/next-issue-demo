import axios from 'axios';

import {getSession} from "next-auth/react"

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    withCredentials: false,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    async config => {
        // 参考：https://stackoverflow.com/questions/77564411/use-axios-interceptor-to-refresh-the-token-for-next-auth
        const session = await getSession()
        console.log('axiosInstance.interceptors session =', session)

        // 在发送请求之前做些什么，例如从 localStorage 获取 token
        // const token = localStorage.getItem('token');
        if (session && session.accessToken) {
            // 让每个请求都带上自定义的 token 请根据实际情况自行修改
            config.headers.Authorization = session.accessToken;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);


export default axiosInstance;
