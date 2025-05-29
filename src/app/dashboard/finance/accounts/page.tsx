import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchChartofAccounts, fetchRootAccounts } from '@/actions/accounts/fetch-accounts';
import { AccountNameFilterrs } from '@/components/dashboard/finance/account-name-filterer';
import { AccountsTable } from '@/components/dashboard/finance/accounts-table';
import { AddNewAccountDiaglog } from '@/components/dashboard/finance/add-account-dialog';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "Finance || Accounts list"
}

interface AccountListProps {
  searchParams: { create: boolean; accountName: string };
}

const page = async ({ searchParams }: AccountListProps) => {
  const { create, accountName } = searchParams;

  const chartOfAccounts = await fetchChartofAccounts();
  const rootAccounts = await fetchRootAccounts();

  //* Filter accounts if accountName is provided
  
  const filteredAccounts = accountName
    ? chartOfAccounts.filter((account) => account.accountName.toLowerCase().includes(accountName.toLowerCase()))
    : chartOfAccounts;

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
          <AccountNameFilterrs filters={{ accountName }} basePath={paths.dashboard.finance.list} />
          <Divider />
          <Box sx={{ overflowX: 'auto' }}>
            <AccountsTable rows={filteredAccounts} />
          </Box>
        </Card>
        <AddNewAccountDiaglog
          accountType={rootAccounts.map((accounts) => {
            return {
              rootId: accounts.rootId,
              rootName: accounts.rootName,
              rootType: accounts.rootType,
            };
          })}
          open={create}
        />
      </Stack>
    </Box>
  );
};

export default page;
