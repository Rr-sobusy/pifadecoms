'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import RouterLink from 'next/link';
type Props = {};

function determinePath(): string {
  const pathname = usePathname();
  return pathname.split('/dashboard/memberLoans/create/')[1] ?? 'new';
}

function LoanTabs({}: Props) {
  const path = determinePath();
  return (
    <Tabs sx={{ borderBottom: '1px solid var(--mui-palette-divider)' }} value={path}>
      <Tab LinkComponent={RouterLink} href='/dashboard/memberLoans/create/new' label="New Loan" tabIndex={0} value="new" />
      <Tab LinkComponent={RouterLink} href='/dashboard/memberLoans/create/existing' label="Existing" tabIndex={1} value="existing" />
    </Tabs>
  );
}

export default LoanTabs;
