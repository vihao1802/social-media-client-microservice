export interface ResetPasswordRequestBase {
  email: string;
}

export interface ResetPasswordRequest extends ResetPasswordRequestBase {}

export interface ResetPassword {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OTPPayload extends ResetPasswordRequestBase {
  otp: string;
}

export interface OTPPayloadResponse {
  data: string;
}
