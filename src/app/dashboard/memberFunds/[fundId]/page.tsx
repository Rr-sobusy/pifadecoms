import React from 'react';
import RouterLink from 'next/link';
import { redirect } from 'next/navigation';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import type { FundTransactionsType } from '@prisma/client';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchFundTransactions } from '@/actions/funds/fetch-fund-transaction';
import AdbCalculator from '@/components/dashboard/funds/adb-interest-card';
import FundTransactionNonPosting from '@/components/dashboard/funds/fund-transact-already-posted';
import { FundTransactionWithPosting } from '@/components/dashboard/funds/fund-transaction-with-posting';
import SavingsCard from '@/components/dashboard/funds/savings-card';
import SharesCard from '@/components/dashboard/funds/shares-card';
import type { Metadata } from 'next';

interface PageProps {
  params: { fundId: number };
  searchParams: {
    transactionType: FundTransactionsType;
    computeAdb: 'Savings' | 'ShareCapital';
    postingType: 'non-posting' | 'with-posting';
  };
}

export const metadata: Metadata = {
  title: 'PIFADECO | Member funds current',
};


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
            <Stack spacing={3}>
              <div>
                <Typography
                  component={RouterLink}
                  href={paths.dashboard.funds.list}
                  color="text.primary"
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back to Member funds
                </Typography>
              </div>
              <div>
                <Typography variant="h4">Member Fund Dashboard</Typography>
                <Chip
                  sx={{ marginTop: 1 }}
                  color="default"
                  variant="outlined"
                  label={`${fundTransactions.Member.lastName}, ${fundTransactions.Member.firstName}`}
                />
              </div>
            </Stack>
          </Box>
        </Stack>
        <SavingsCard fund={fundTransactions} />
        <SharesCard fund={fundTransactions} />
      </Stack>
      <FundTransactionWithPosting
        transactionType={searchParams.transactionType}
        fundId={params.fundId}
        accounts={accounts}
        fundTransactions={fundTransactions}
        open={Boolean(
          ['SavingsDeposit', 'SavingsWithdrawal', 'ShareCapDeposit', 'ShareCapWithdrawal'].includes(
            searchParams.transactionType
          ) && searchParams.postingType === 'with-posting'
        )}
      />
      <FundTransactionNonPosting
        transactionType={searchParams.transactionType}
        fundId={params.fundId}
        fundTransactions={fundTransactions}
        open={Boolean(
          ['SavingsDeposit', 'ShareCapDeposit'].includes(searchParams.transactionType) &&
            searchParams.postingType === 'non-posting'
        )}
      />
      <AdbCalculator
        computeAdbType={searchParams.computeAdb}
        open={Boolean(searchParams.computeAdb === 'Savings' || searchParams.computeAdb === 'ShareCapital')}
        fund={fundTransactions}
      />
    </Box>
  );
}

export default page;
