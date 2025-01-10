import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

import { paths } from '@/paths';

export async function NextAuthGuard({ children }: { children: React.ReactNode }) {
  const user = await auth();
//   if (!user) {
//     redirect(paths.auth.custom.signIn);
//   }
  return <>{children}</>;
}
