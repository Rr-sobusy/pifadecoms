import React from 'react';
import { auth } from '@/auth';

export async function NextAuthGuard({ children }: { children: React.ReactNode }) {
  // const user = await auth();
//   if (!user) {
//     redirect(paths.auth.custom.signIn);
//   }
  return <>{children}</>;
}
