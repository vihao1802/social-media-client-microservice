import { Role } from "./role";

export interface UserBase {
  username: string;
  email: string;
  phoneNumber: string;
  day_of_birth: string;
  gender: boolean;
  bio: string;
}

export interface User extends UserBase {
  id: string;
  isDisabled: boolean;
  created_at: string;
  profile_img: string;
}

export interface UserRequest extends UserBase {
  password: string;
}
