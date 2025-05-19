import React from 'react';

import { SplitLayout } from '@/components/auth/split-layout';
import { SignInForm } from '@/components/auth/cognito/sign-in-form';

function page(): React.JSX.Element {
  return (
    <SplitLayout>
     <SignInForm />
    </SplitLayout>
  );
}

export default page;
