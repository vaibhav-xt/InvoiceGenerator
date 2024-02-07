import axios from 'axios';
export const user_token: string = localStorage.getItem("access_token") || "";

// Base API
const API = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: { "Content-Type": "application/json" }
});

API.interceptors.request.use(
    (config) => {
        config.headers["x-access-token"] = user_token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        if (response.data.status === "LogedInSuccess") {
            window.location.reload();
        }
        return response;
    },
    async (error) => {
        if (error.response.data.status === "AuthFailed") {
            localStorage.removeItem("access_token");
        }
    }
)

export default API;
