import { createContext } from "react";

export const RecoveryContext = createContext({
  page: "login",
  setPage: (page: string) => {},
  email: "",
  setEmail: (email: string) => {},
  otp: 0,
  setOTP: (otp: number) => {},
});
