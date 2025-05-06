import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MoneyWavy as EarningIcon } from '@phosphor-icons/react/dist/ssr';
import { CurrencyDollarSimple as DollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollarSimple';
import { User } from '@phosphor-icons/react/dist/ssr/User';
import { UserCircleDashed as LoanIcon } from '@phosphor-icons/react/dist/ssr/UserCircleDashed';

import { config } from '@/config';
import { formatToCurrency } from '@/lib/format-currency';
import { fetchMembers } from '@/actions/members/fetch-members';
import { fetchActiveLoans } from '@/actions/overview/fetch-active-loans';
import fetchCurrentEquities from '@/actions/overview/fetch-current-equities';
import { fetchMonthlyIncomeAndExpense } from '@/actions/overview/fetch-income-expense-by-month-current';
import { fetchTotalEarnings } from '@/actions/overview/fetch-total-earnings';
import NetSurplusCard from '@/components/dashboard/overview/net-surplus-card';
import RevenueExpenseCard from '@/components/dashboard/overview/revenue-expense-card';
import SummaryCard from '@/components/dashboard/overview/summary-card';
import { fetchMonthlyNetSurplus } from '@/actions/overview/fetch-monthly-net-surplus';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {
  const [incomeExpense, members, currentEquities, activeLoans, totals, netSurplus] = await Promise.all([
    fetchMonthlyIncomeAndExpense(),
    fetchMembers({ fetchOnlyActive: true, returnAll: true }),
    fetchCurrentEquities(),
    fetchActiveLoans(),
    fetchTotalEarnings(),
    fetchMonthlyNetSurplus()
  ]);
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
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Overview</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={User} title="Active members" value={members.totalCount} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={DollarIcon} title="Current Equities" value={formatToCurrency(currentEquities)} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={LoanIcon} title="Active loans" value={activeLoans} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard
              icon={EarningIcon}
              title="Net earnings (from implementation)"
              value={formatToCurrency(totals.Revenue - totals.Expense)}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 7,
            }}
          >
            <RevenueExpenseCard data={incomeExpense} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 5,
            }}
          >
            <NetSurplusCard data={netSurplus} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
