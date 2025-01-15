'use client';

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <Suspense>{children}</Suspense>
    </div>
  );
}
