import { createContext } from 'react';

export const RecoveryContext = createContext({
  page: 'login',
  setPage: (page: string) => {},
  email: '',
  setEmail: (email: string) => {},
  resetPasswordToken: '',
  setResetPasswordToken: (token: string) => {},
});
