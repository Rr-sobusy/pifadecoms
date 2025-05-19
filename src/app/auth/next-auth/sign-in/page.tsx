import React from 'react';
import { Typography } from '@mui/material';

import { SplitLayout } from '@/components/auth/split-layout';
import { SignInForm } from '@/components/auth/cognito/sign-in-form';

type Props = {};

function page({}: Props) {
  return (
    <SplitLayout>
     <SignInForm />
    </SplitLayout>
  );
}

export default page;
