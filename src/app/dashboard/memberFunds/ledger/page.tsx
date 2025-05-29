import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PiggyBank as DepositIcon, HandArrowDown as WithdrawIcon } from '@phosphor-icons/react/dist/ssr';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import type { FundTransactionsType } from '@prisma/client';

import { paths } from '@/paths';
import { fetchFundLedger } from '@/actions/funds/fetch-fund-ledgers';
import FundTotalOverview from '@/components/dashboard/funds/fund-totals-overview';
import FundTransactionLedgerTable from '@/components/dashboard/funds/fund-transaction-ledger-table';
import LedgerDatePickerDialog from '@/components/dashboard/funds/ledger-date-picker-dialog';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "PIFADECO || Member funds ledger"
}

interface PageProps {
  searchParams: { selectPeriod: boolean; startDate: Date; endDate: Date };
}

async function page({ searchParams }: PageProps): Promise<React.ReactNode> {
  const fundTransactions = await fetchFundLedger(searchParams.startDate, searchParams.endDate);

  const totals = fundTransactions.reduce<Record<FundTransactionsType, number>>(
    (acc, curr) => {
      const type = curr.transactionType;
      acc[type] = (acc[type] || 0) + Number(curr.postedBalance);
      return acc;
    },
    {
      SavingsDeposit: 0,
      SavingsWithdrawal: 0,
      ShareCapDeposit: 0,
      ShareCapWithdrawal: 0,
    } as Record<FundTransactionsType, number>
  );

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Fund Transactions Ledger</Typography>
          </Box>

          <Stack direction="row">
            <div>
              <Button
                LinkComponent={Link}
                href={`${paths.dashboard.funds.ledger}?selectPeriod=true`}
                startIcon={<FilterIcon />}
                variant="text"
              >
                Fiscal Period
              </Button>
            </div>
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 3,
            }}
          >
            <FundTotalOverview icon={DepositIcon} total={totals.SavingsDeposit} transactionType="SavingsDeposit" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 3,
            }}
          >
            <FundTotalOverview
              icon={WithdrawIcon}
              total={totals.SavingsWithdrawal}
              transactionType="SavingsWithdrawal"
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 3,
            }}
          >
            <FundTotalOverview icon={DepositIcon} total={totals.ShareCapDeposit} transactionType="ShareCapDeposit" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 3,
            }}
          >
            <FundTotalOverview
              icon={WithdrawIcon}
              total={totals.ShareCapWithdrawal}
              transactionType="ShareCapWithdrawal"
            />
          </Grid>
        </Grid>
        <Box sx={{ overflowX: 'scroll' }}>
          <FundTransactionLedgerTable rows={fundTransactions} />
        </Box>
      </Stack>
      <LedgerDatePickerDialog isOpen={Boolean(searchParams.selectPeriod)} />
    </Box>
  );
}

export default page;
