export interface UserBase {
  username: string;
  email: string;
  gender: boolean;
  dayOfBirth: string;
}

export interface User extends UserBase {
  id: string;
  isDisabled: boolean;
  created_at: string;
  profile_img: string;
  bio: string;
}

export interface UserRequest extends UserBase {
  password: string;
}
