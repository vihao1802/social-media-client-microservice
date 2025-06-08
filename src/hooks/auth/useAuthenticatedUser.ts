import { authApi } from '@/api/auth';
import { LoginRequest } from '@/models/auth-login';
import useSWR, { SWRConfiguration } from 'swr';
import cookies from 'js-cookie';
import { RegisterRequest } from '@/models/auth-register';
import {
  OTPPayload,
  ResetPassword,
  ResetPasswordRequest,
} from '@/models/auth-forgotpassword';
import { User } from '@/models/user';

function getUserFromStorage() {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as User) : null;
}

export function useAuthenticatedUser(options?: Partial<SWRConfiguration>) {
  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    'authenticated_user',
    async () => {
      try {
        if (!cookies.get('access_token')) return null;
        return await authApi.getAuthenticatedUser();
      } catch (error) {
        throw error;
      }
    },
    {
      ...options,
    }
  );

  const firstLoading = user === undefined && error === undefined;

  async function login(payload: LoginRequest) {
    const res = await authApi.login(payload);
    await mutate();
    return res;
  }

  async function logout() {
    // if (token) await authApi.logout(token);
    mutate(null, false);
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    localStorage.clear();
  }

  async function register(payload: RegisterRequest) {
    const res = await authApi.register(payload);
    return res;
  }

  async function signInGoogle() {
    const res = await authApi.signInGoogle();
    return res;
  }

  async function signInFacebook() {
    const res = await authApi.signInFacebook();
    return res;
  }

  async function getOTP(payload: ResetPasswordRequest) {
    const res = await authApi.sendResetPasswordToken(payload);
    return res;
  }

  async function verifyOTP(payload: OTPPayload) {
    const res = await authApi.verifyOTP(payload);
    return res;
  }

  async function resetPassword(payload: ResetPassword) {
    const res = await authApi.resetPassword(payload);
    return res;
  }

  return {
    user,
    firstLoading,
    error,
    mutate,
    login,
    logout,
    register,
    signInGoogle,
    signInFacebook,
    getOTP,
    resetPassword,
    verifyOTP,
  };
}
