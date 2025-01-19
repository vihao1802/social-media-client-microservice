'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import LeftSideBar from '@/components/shared/LeftSideBar';
import AuthProvider from '@/providers/AuthProvider';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
          <div className="flex flex-row">
            <LeftSideBar />
            {children}
          </div>
        </AuthProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
