export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {}

export interface RefreshTokenRequest {
  token: string;
}

export interface LoginResponse {
  token: string;
  authenticated: boolean;
}

export interface RefreshTokenResponse {
  token: string;
  authenticated: boolean;
}
