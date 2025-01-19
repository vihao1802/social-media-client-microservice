export interface UserBase {
  username: string;
  email: string;
  gender: string;
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

/* 
"total": 8,
    "page": 1,
    "pageSize": 10,
    "totalPage": 1,
    "data": []
*/

export interface UpdateUserRequest extends UserBase {}
