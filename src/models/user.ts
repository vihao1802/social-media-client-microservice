export interface UserBase {
  username: string;
  email: string;
  gender: boolean;
  date_of_birth: string;
  id: string;
  bio: string;
  profile_img: string;
  phoneNumber: string;
}

export interface User extends UserBase {
  create_at: string;
  relationshipId?: number;
}

export interface UpdateUserRequest extends UserBase {}
