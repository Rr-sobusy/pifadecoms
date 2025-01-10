import * as React from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';
import { NextAuthGuard } from '@/components/auth/next-auth';
import { DynamicLayout } from '@/components/dashboard/layout/dynamic-layout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <NextAuthGuard>
      <DynamicLayout>{children}</DynamicLayout>
    </NextAuthGuard>
  );
}
