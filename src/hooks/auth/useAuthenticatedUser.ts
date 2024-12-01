import { authApi } from "@/api/auth";
import { LoginRequest } from "@/models/auth-login";
import useSWR, { SWRConfiguration } from "swr";
import cookies from "js-cookie";
import { RegisterRequest } from "@/models/auth-register";

export function useAuthenticatedUser(options?: Partial<SWRConfiguration>) {
  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "authenticated_user",
    async () => {
      try {
        if (
          cookies.get("token") === null ||
          cookies.get("token") === undefined
        ) {
          return null;
        }
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
    const token = cookies.get("token");
    if (token) {
      await authApi.logout(token);
    }
    mutate(null, false);
    cookies.remove("token");
  }

  async function register(payload: RegisterRequest) {
    const res = await authApi.register(payload);
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
  };
}
