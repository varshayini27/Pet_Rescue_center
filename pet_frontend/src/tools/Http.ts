import axios from "axios";
import { API_BASE_URL } from "../Components/types/constants";
import { setLoading } from "./loading";

const Http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    }
})
let requestCount = 0;
Http.interceptors.request.use(async (config) => {

    requestCount++;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (err) => Promise.reject(err));

Http.interceptors.response.use((response): any => {
    requestCount--;
    
    if (requestCount === 0) setLoading(false);
    if (!response.data.success && !response?.data?.status) {
        return Promise.reject(response?.data);
    }

    return response;
}, (error) => {
    requestCount--;
    if (requestCount === 0) setLoading(false);
    if (error.status == 401) {
        localStorage.removeItem('token'); 
        window.location.pathname = '/';
    }
    return Promise.reject(error.response.data);
});

export default Http;