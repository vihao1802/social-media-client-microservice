"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import LeftSideBar from "@/components/shared/LeftSideBar";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Box, LinearProgress } from "@mui/material";
import { createContext, useState } from "react";

export const ProgressBarContext = createContext<{
  isLoadingProgress: boolean;
  setIsLoadingProgress: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoadingProgress: false,
  setIsLoadingProgress: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  return (
    <div>
      {isLoadingProgress && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        >
          <LinearProgress />
        </Box>
      )}

      <ProgressBarContext.Provider
        value={{ isLoadingProgress, setIsLoadingProgress }}
      >
        <AppRouterCacheProvider>
          <StreamVideoProvider>
            <div className="flex flex-row">
              <LeftSideBar />
              {children}
            </div>
          </StreamVideoProvider>
        </AppRouterCacheProvider>
      </ProgressBarContext.Provider>
    </div>
  );
}
