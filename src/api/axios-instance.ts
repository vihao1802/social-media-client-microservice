import { Error } from '@/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { authApi } from './auth';
import cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_SERVICE_URL,
  timeout: 60000,
  headers: {
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json',
  },
});
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = cookies.get('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTVydXUzdWkwMDAzdmgzd3Z6bWRvM2pqIiwidXNlcm5hbWUiOiJ2aWhhbyIsImVtYWlsIjoidmloYW9AZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MzY1Nzk5MzIwNzQsImV4cCI6MTczNjU3OTkzNTY3NH0.CmD03utap4ERm1RBDeyj0eFDuxJygdCie3i55-bktBk';
    if (token && config.method && config.url) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = tokenPayload.exp - currentTime;
      // console.log("config.url:", config.url);
      // console.log("Remaining time:", remainingTime);
      // console.log("token in config:", token);

      if (remainingTime <= 20 && !isRefreshing) {
        isRefreshing = true;
        try {
          const res = await authApi.refresh({ token: token });
          config.headers.Authorization = `Bearer ${res?.token}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, '')}`;
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
      console.log('1. API Error:', error.request);

      if (error.response.status === 400) {
        toast.error('Bad request, please try again');
      } else if (error.response.status === 404) {
        console.error('Resource not found');
        toast.error('Resource not found');
      } else if (error.response.status >= 500) {
        toast.error('Server error, please try again later');
      }
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return error;
  }
);

export default axiosInstance;
