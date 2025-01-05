export interface ResetPasswordRequestBase {
  email: string;
}

export interface ResetPasswordRequest extends ResetPasswordRequestBase {}

export interface ResetPassword extends ResetPasswordRequestBase {
  newPassword: string;
  resetToken: string;
}
