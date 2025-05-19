'use server';

import { signIn } from '@/auth';

export async function signInUsingCredentials(data: any) {
  await signIn('credentials', { redirectTo: '/dashboard', ...data });
}
