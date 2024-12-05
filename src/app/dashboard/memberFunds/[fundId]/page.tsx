import React from 'react';
import { redirect } from 'next/navigation';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FundTransactionsType } from '@prisma/client';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchFundTransactions } from '@/actions/funds/fetch-fund-transaction';
import AdbCalculator from '@/components/dashboard/funds/adb-interest-card';
import SavingsCard from '@/components/dashboard/funds/savings-card';
import { CreateSavingsTransaction } from '@/components/dashboard/funds/savings-transact-dialog';
import SharesCard from '@/components/dashboard/funds/shares-card';

interface PageProps {
  params: { fundId: number };
  searchParams: { transactionType: FundTransactionsType , computeAdb :  "Savings" | "Share"};
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
            <Chip
              sx={{ marginTop: 1 }}
              color="default"
              variant="outlined"
              label={`${fundTransactions.Member.lastName}, ${fundTransactions.Member.firstName}`}
            />
          </Box>
        </Stack>
        <SavingsCard fund={fundTransactions ?? []} />
        <SharesCard fund={fundTransactions} />
      </Stack>
      <CreateSavingsTransaction
        transactionType={searchParams.transactionType}
        fundId={params.fundId}
        accounts={accounts}
        fundTransactions={fundTransactions}
        open={Boolean(
          ['SavingsDeposit', 'SavingsWithdrawal', 'ShareCapDeposit', 'ShareCapWithdrawal'].includes(
            searchParams.transactionType
          )
        )}
      />
      <AdbCalculator open={Boolean(searchParams.computeAdb === "Savings" || searchParams.computeAdb === "Share")} fund={fundTransactions} />
    </Box>
  );
}

export default page;
