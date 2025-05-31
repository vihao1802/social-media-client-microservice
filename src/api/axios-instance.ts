import { Error } from '@/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { authApi } from './auth';
import cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 60000,
  headers: {
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false; // Flag to prevent multiple refresh requests

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = cookies.get('access_token');
    const refresh_token = cookies.get('refresh_token');

    if (access_token && refresh_token && config.method && config.url) {
      const tokenPayload = JSON.parse(atob(access_token.split('.')[1])); // Decode token
      const currentTime = Math.floor(Date.now() / 1000); // get time in seconds
      const remainingTime = tokenPayload.exp - currentTime;

      console.log('[config token] config.url:', config.url);
      // console.log('[config token] Remaining time:', remainingTime);
      console.log('[config token] token in config:', access_token);

      if (remainingTime <= 20 && !isRefreshing) {
        isRefreshing = true;
        try {
          const res = await authApi.refresh({ access_token, refresh_token });
          config.headers.Authorization = `Bearer ${res?.access_token}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers.Authorization = `Bearer ${access_token.replace(/^"|"$/g, '')}`;
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
      const res = JSON.parse(error.request.response);
      console.log('[axios] API Error:', res);

      // if (error.response.status === 400) {
      //   toast.error('Bad request, please try again');
      // } else
      if (error.response.status === 404) {
        console.error('[axios] Resource not found');
        toast.error('Resource not found');
      } else if (error.response.status >= 500) {
        toast.error('Server error, please try again later');
        if (res.message)
          toast.error(
            res.message.length < 25
              ? res.message
              : 'See [axios] API Error in browser logs'
          );
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
