"use client";
import AuthSignInProvider from "@/providers/AuthSignInProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSignInProvider>
      <div className="flex w-full h-[100vh]">{children}</div>
    </AuthSignInProvider>
  );
}
