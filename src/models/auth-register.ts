export interface RegisterBase {
  username: string;
  email: string;
  gender: boolean;
}

export interface RegisterRequest extends RegisterBase {
  password: string;
  dob: string;
}

export interface RegisterResponse extends RegisterBase {
  id: string;
  bio: string;
  profileImg: string;
  hashedPassword: string;
  DateOfBirth: string;
  isLocked: boolean;
  isEmailVerified: boolean;
  isDisabled: boolean;
  isOnline: boolean;
  createdAt: string;
  roleId: number;
}
