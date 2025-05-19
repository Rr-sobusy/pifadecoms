import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function NextAuthGuard({ children }: { children: React.ReactNode }) {
  const user = await auth();
  if (!user) {
    redirect('/auth/next-auth/sign-in');
  }
  return <>{children}</>;
}
