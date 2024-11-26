export interface UserBase {
  userName: string;
  email: string;
  gender: boolean;
  dayOfBirth: string;
}

export interface User extends UserBase {
  id: string;
}

export interface UserRequest extends UserBase {
  password: string;
}
