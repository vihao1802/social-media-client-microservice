import { Error } from "@/types/interfaces";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "./auth";
import cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
let isRefreshing = false;

const PUBLIC_ENDPOINTS_POST_METHOD = [
  "api/v1/auth/login",
  "api/v1/auth/introspect",
  "api/v1/auth/refresh-token",
  "api/v1/auth/logout",
  "api/v1/users/register",
];
const PUBLIC_ENDPOINTS_GET_METHOD = ["api/v1/court-types", "api/v1/courts"];

function isPublicEndpoint(method: string, url: string) {
  const publicEndpoints =
    method === "POST"
      ? PUBLIC_ENDPOINTS_POST_METHOD
      : method === "GET"
      ? PUBLIC_ENDPOINTS_GET_METHOD
      : [];

  // Match if `url` starts with any of the public endpoints
  return publicEndpoints.some((endpoint) => url.startsWith(endpoint));
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = cookies.get("token");
    if (
      token &&
      config.method &&
      config.url &&
      !isPublicEndpoint(config.method, config.url)
    ) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = tokenPayload.exp - currentTime;
      console.log("config.url:", config.url);
      console.log("Remaining time:", remainingTime);
      console.log("token in config:", token);

      if (remainingTime <= 20 && !isRefreshing) {
        isRefreshing = true;
        try {
          const res = await authApi.refresh({ token: token });
          config.headers.Authorization = `Bearer ${res?.token}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, "")}`;
      }
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: Error) => {
    if (error.response) {
      console.log("1. API Error:", error.request);

      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 404) {
        console.error("Resource not found");
        toast.error(error.response.data.message);
      } else if (error.response.status >= 500) {
        console.error("Server error, please try again later");
        toast.error("Không thể kết nối đến server");
      }
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    return error;
  }
);

export default axiosInstance;
