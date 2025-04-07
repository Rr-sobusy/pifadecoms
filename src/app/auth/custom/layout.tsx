import * as React from 'react';

// import { AuthStrategy } from '@/lib/auth/strategy';
import { SignInForm } from '@/components/auth/cognito/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';

// We are not adding the auth check because there might be individual pages that require the user to be authenticated.
// Another reason is that layouts get cached and loaded only once for all children.

// interface LayoutProps {
//   children: React.ReactNode;
// }

export default function Layout(): React.JSX.Element {
  return (
    <SplitLayout>
      <SignInForm />
    </SplitLayout>
  );
}
