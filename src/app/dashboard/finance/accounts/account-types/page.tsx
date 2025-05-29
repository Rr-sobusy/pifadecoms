import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import AccountTypesTable from '@/components/dashboard/finance/account-types-table';
import { AddNewAccountTypeDialog } from '@/components/dashboard/finance/add-account-type-dialog';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "Finance || Account types"
}

interface AccountListProps {
  searchParams: { create: boolean };
}

const page = async ({ searchParams }: AccountListProps) => {
  const { create } = searchParams;

  const accounts = await fetchAccountTree(true);
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Account Types</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.finance.types}?create=true`}
              variant="contained"
            >
              Add account
            </Button>
          </Box>
        </Stack>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <AccountTypesTable accounts={accounts} />
          </Box>
        </Card>
        <AddNewAccountTypeDialog open={Boolean(create)} />
      </Stack>
    </Box>
  );
};

export default page;
