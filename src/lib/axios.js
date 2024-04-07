import axios from 'axios';

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    withCredentials: true,
});

export default axiosInstance;
