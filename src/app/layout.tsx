import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
const roboto = Roboto({ subsets: ['latin'], weight: ['500'] });

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Generated by create next app',
  icons: '/icons/logo.png',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <main>
            {children} <Toaster />
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
