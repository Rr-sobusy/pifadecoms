'use server';

import { signIn } from '@/auth';
import type { SignInSchema } from '@/components/auth/cognito/sign-in-form';

export async function signInUsingCredentials(data: SignInSchema) {
  await signIn('credentials', { redirectTo: '/dashboard', ...data });
}
