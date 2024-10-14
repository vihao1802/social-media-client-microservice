import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import LeftSideBar from "@/components/shared/LeftSideBar";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppRouterCacheProvider>
        <StreamVideoProvider>
          <div className="flex flex-row">
            <LeftSideBar />
            {children}
          </div>
        </StreamVideoProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
