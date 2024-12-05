"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import LeftSideBar from "@/components/shared/LeftSideBar";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import AuthProvider from "@/providers/AuthProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dayjs.extend(relativeTime);
  return (
    <div>
      <AppRouterCacheProvider>
        <AuthProvider>
          <StreamVideoProvider>
            <div className="flex flex-row">
              <LeftSideBar />
              {children}
            </div>
          </StreamVideoProvider>
        </AuthProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
