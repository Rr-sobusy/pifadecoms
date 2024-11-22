import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchChartofAccounts, fetchRootAccounts } from '@/actions/accounts/fetch-accounts';
import { AccountsTable } from '@/components/dashboard/finance/accounts-table';
import { AddNewAccountDiaglog } from '@/components/dashboard/finance/add-account-dialog';

interface AccountListProps {
  searchParams: { create: boolean };
};

const page = async ({ searchParams }: AccountListProps) => {
  const { create } = searchParams;

  const chartOfAccounts = await fetchChartofAccounts();
  const rootAccounts = await fetchRootAccounts();
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
            <Typography variant="h4">Chart of Accounts</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href={`${paths.dashboard.finance.list}?create=true`} variant="contained">
              Add account
            </Button>
          </Box>
        </Stack>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <AccountsTable rows={chartOfAccounts} />
          </Box>
        </Card>
        <AddNewAccountDiaglog
          accountType={rootAccounts.map((accounts) => {
            return {
              rootId: accounts.rootId,
              rootName: accounts.rootName,
              rootType: accounts.rootType
            };
          })}
          open={create}
        />
      </Stack>
    </Box>
  );
};

export default page;
