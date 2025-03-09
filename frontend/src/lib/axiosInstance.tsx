import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

export default axiosInstance;