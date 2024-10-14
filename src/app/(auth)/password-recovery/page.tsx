"use client";
import OTPInput from "@/components/password-recovery/OTPInput";
import Recovered from "@/components/password-recovery/Recovered";
import ResetPassword from "@/components/password-recovery/ResetPassword";
import SendOTPEmail from "@/components/password-recovery/SendOTPEmail";
import { useState, createContext } from "react";

export const RecoveryContext = createContext<{
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  otp: number;
  setOTP: React.Dispatch<React.SetStateAction<number>>;
}>({
  page: "login",
  setPage: () => {},
  email: "",
  setEmail: () => {},
  otp: 0,
  setOTP: () => {},
});

const PasswordRecoveryPage = () => {
  const [page, setPage] = useState("send-email");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(0);

  const NavigateComponents = () => {
    if (page === "send-email") return <SendOTPEmail />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <ResetPassword />;

    return <Recovered />;
  };

  return (
    <RecoveryContext.Provider
      value={{
        page,
        setPage,
        email,
        setEmail,
        otp,
        setOTP,
      }}
    >
      <div className="m-auto">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
};

export default PasswordRecoveryPage;
