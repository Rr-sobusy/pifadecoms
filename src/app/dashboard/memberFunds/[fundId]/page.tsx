import React from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchFundTransactions } from '@/actions/funds/fetch-fund-transaction';
import type { FundTransactionsType } from '@prisma/client';
import SavingsCard from '@/components/dashboard/funds/savings-card';
import { CreateSavingsTransaction } from '@/components/dashboard/funds/savings-transact-dialog';

interface PageProps {
  params: { fundId: number };
  searchParams: { transactionType: FundTransactionsType };
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
        <SavingsCard fund={fundTransactions ?? []} />
      </Stack>
      <CreateSavingsTransaction transactionType={searchParams.transactionType} fundId={params.fundId} accounts={accounts} fundTransactions={fundTransactions} open={Boolean(searchParams.transactionType)} />
    </Box>
  );
}

export default page;
