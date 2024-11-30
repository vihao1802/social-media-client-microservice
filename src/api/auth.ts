import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/models/auth-login";
import axiosInstance from "./axios-instance";
import { User } from "@/models/user";
import toast from "react-hot-toast";
import cookies from "js-cookie";
import { RegisterRequest, RegisterResponse } from "@/models/auth-register";

const prefix = "/auth";
export const authApi = {
  async login(request: LoginRequest) {
    const res = await axiosInstance.post<LoginResponse>(
      `${prefix}/login`,
      request
    );

    if (res.status === 400) {
      return;
    }

    cookies.set("token", res.data.token);
    return res;
  },

  logout(request: LogoutRequest) {
    return axiosInstance.post(`${prefix}/logout`, request);
  },

  async refresh(request: RefreshTokenRequest) {
    console.log("2: refresh: " + request.token);
    request.token = request.token.replace(/^"|"$/g, "");
    const res = await axiosInstance.post<RefreshTokenResponse>(
      `${prefix}/refresh-token`,
      request
    );
    console.log("3 res: " + res);

    if (res.status === 400 || res.status === 401 || res.status === 404) {
      cookies.remove("token");
      window.location.href = "/sign-in";
      toast.error("Hết phiên đăng nhập");
      return;
    }
    console.log("3: refresh: " + res.data.token);

    cookies.set("token", JSON.stringify(res.data.token));
    return res.data;
  },

  async getAuthenticatedUser() {
    if (cookies.get("token") === null) {
      return null;
    }
    const res = await axiosInstance.get<User>("/user/me");

    console.log("getAuthenticatedUser");

    if (res.status === 400 || res.status === 401) {
      // getAuthenticatedUser: status 400 or 401, refresh token and try again

      await this.refresh({
        token: cookies.get("token") as string,
      });

      this.getAuthenticatedUser();
    }

    return res.data;
  },

  async register(request: RegisterRequest) {
    const res = await axiosInstance.post<RegisterResponse>(
      `${prefix}/register`,
      request
    );

    if (res.status === 400) {
      return;
    }

    return res;
  },
};
