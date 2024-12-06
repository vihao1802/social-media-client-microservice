"use client";
import OTPInput from "@/components/password-recovery/OTPInput";
import Recovered from "@/components/password-recovery/Recovered";
import ResetPassword from "@/components/password-recovery/ResetPassword";
import SendOTPEmail from "@/components/password-recovery/SendOTPEmail";
import { useState } from "react";
import { RecoveryContext } from "@/context/recovery-context";

const ResetPasswordPage = () => {
  return (
    <div className="m-auto">
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
