'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import LeftSideBar from '@/components/shared/LeftSideBar';
import AuthProvider from '@/providers/AuthProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { WebSocketProvider } from '@/providers/WebSocketProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  return (
    <div>
      <AppRouterCacheProvider>
        <AuthProvider>
          <WebSocketProvider>
            <div className="flex flex-row">
              <LeftSideBar />
              {children}
            </div>
          </WebSocketProvider>
        </AuthProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
