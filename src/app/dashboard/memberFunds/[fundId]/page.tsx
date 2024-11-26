import React from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchFundTransactions } from '@/actions/funds/fetch-fund-transaction';
import type { MemberFundsType } from '@/actions/funds/types';
import SavingsCard from '@/components/dashboard/funds/savings-card';
import { CreateSavingsTransaction } from '@/components/dashboard/funds/savings-transact-dialog';

interface PageProps {
  params: { fundId: number };
  searchParams: { transactionType: string };
}

async function page({ params, searchParams }: PageProps) {

  const [fundTransactions, accounts] = await Promise.all([
    fetchFundTransactions(Number(params.fundId)),
    fetchAccountTree(),
  ]);


  if (!fundTransactions) {
    redirect(paths.dashboard.funds.list);
  }

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
            <Typography variant="h4">Member Fund Dashboard</Typography>
          </Box>
        </Stack>
        <SavingsCard rows={fundTransactions?.Transactions ?? []} />
      </Stack>
      <CreateSavingsTransaction fundId={params.fundId} accounts={accounts} fundTransactions={fundTransactions} open={Boolean(searchParams.transactionType)} />
    </Box>
  );
}

export default page;
