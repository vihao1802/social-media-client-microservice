export interface RegisterBase {
  userName: string;
  email: string;
  date_of_birth: string;
}

export interface RegisterRequest extends RegisterBase {
  password: string;
  gender: boolean;
}

export interface RegisterResponse extends RegisterBase {}
