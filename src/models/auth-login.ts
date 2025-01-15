export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  data: {
    email: string;
    access_token: string;
    refresh_token: string;
  };
  message: string;
}

export interface LogoutRequest {}

export interface RefreshTokenRequest {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  email: string;
  access_token: string;
}
