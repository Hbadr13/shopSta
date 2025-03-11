import axios from "axios";
import { getCookie } from "cookies-next/client";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        Authorization: getCookie('token')
    }
});

export default axiosInstance;