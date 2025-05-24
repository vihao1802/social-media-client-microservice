import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/models/auth-login';
import axiosInstance from './axios-instance';
import { CurrentUserResponse, User } from '@/models/user';
import toast from 'react-hot-toast';
import cookies from 'js-cookie';
import { RegisterRequest, RegisterResponse } from '@/models/auth-register';
import {
  OTPPayload,
  OTPPayloadResponse,
  ResetPassword,
  ResetPasswordRequest,
} from '@/models/auth-forgotpassword';

const prefix = '/auth';
export const authApi = {
  async login(request: LoginRequest) {
    const res = await axiosInstance.post<LoginResponse>(
      `${prefix}/sign-in`,
      request
    );

    if (res.status === 400) {
      return;
    }

    cookies.set('access_token', res.data.data.access_token);
    cookies.set('refresh_token', res.data.data.refresh_token);

    return res;
  },

  logout(request: LogoutRequest) {
    return axiosInstance.post(`${prefix}/logout`, request);
  },

  async refresh(request: RefreshTokenRequest) {
    console.log('[refresh:2] refresh token:');

    request.access_token = request.access_token.replace(/^"|"$/g, ''); // remove ""
    request.refresh_token = request.refresh_token.replace(/^"|"$/g, ''); // remove ""

    const res = await axiosInstance.post<RefreshTokenResponse>(
      `${prefix}/refresh-token`,
      request
    );

    console.log('[refresh:3] res: ' + res);

    if (res.status === 400 || res.status === 401 || res.status === 404) {
      cookies.remove('access_token');
      cookies.remove('refresh_token');
      window.location.href = '/sign-in';
      toast.error('Your session has expired. Please sign in again.');
      return;
    }

    console.log('[refresh:4] new token: ' + res.data.access_token);

    cookies.set('access_token', JSON.stringify(res.data.access_token));

    return res.data;
  },

  async getAuthenticatedUser() {
    if (cookies.get('access_token') === null || cookies.get('token') === null) {
      return null;
    }

    const { data: res } =
      await axiosInstance.get<CurrentUserResponse>('/auth/me');

    console.log('getAuthenticatedUser');

    if (res.status === 400 || res.status === 401) {
      // getAuthenticatedUser: status 400 or 401, refresh token and try again

      await this.refresh({
        access_token: cookies.get('access_token') as string,
        refresh_token: cookies.get('refresh_token') as string,
      });

      this.getAuthenticatedUser();
    }

    console.clear();

    localStorage.setItem('user', JSON.stringify(res.data));

    return res.data;
  },

  async register(request: RegisterRequest) {
    const res = await axiosInstance.post<RegisterResponse>(
      `${prefix}/sign-up`,
      request
    );

    if (res.status === 400) {
      return;
    }

    return res;
  },

  async signInGoogle() {
    const res = await axiosInstance.get(`${prefix}/google/login`);
    return res.data;
  },

  async signInFacebook() {
    const res = await axiosInstance.get(`${prefix}/facebook/login`);
    return res.data;
  },

  async sendResetPasswordToken(request: ResetPasswordRequest) {
    const res = await axiosInstance.post(`${prefix}/forgot-password`, {
      email: request.email,
    });
    return res;
  },

  async verifyOTP(request: OTPPayload) {
    const res = await axiosInstance.post<OTPPayloadResponse>(
      `${prefix}/verify-otp`,
      request
    );
    return res;
  },

  async resetPassword(request: ResetPassword) {
    const res = await axiosInstance.post(`${prefix}/reset-password`, {
      resetToken: request.resetToken,
      newPassword: request.newPassword,
      confirmPassword: request.confirmPassword,
    });
    return res;
  },
};
