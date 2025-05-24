export interface UserBase {
  username: string;
  email: string;
  gender: string;
  phoneNumber: string;
  DateOfBirth: string;
  bio: string;
  profileImg: string;
}

export interface User extends UserBase {
  id: string;
  createdAt: string;
  isLocked: boolean;
  isEmailVerified: boolean;
  isDisabled: boolean;
  isOnline: boolean;
  roleId: number;
  role: {
    roleName: string;
  };
}

export interface CurrentUserResponse {
  status: number;
  data: User;
}

export interface UserPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
  data: User[];
}

export interface UpdateUserRequest extends UserBase {}
