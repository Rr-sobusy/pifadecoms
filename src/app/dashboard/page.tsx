import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CurrencyDollarSimple as DollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollarSimple';
import { User } from '@phosphor-icons/react/dist/ssr/User';
import { UserCircleDashed as LoanIcon } from '@phosphor-icons/react/dist/ssr/UserCircleDashed';
import { MoneyWavy as EarningIcon } from '@phosphor-icons/react/dist/ssr';
import { config } from '@/config';
import { formatToCurrency } from '@/lib/format-currency';
import SummaryCard from '@/components/dashboard/overview/summary-card';
import RevenueExpenseCard from '@/components/dashboard/overview/revenue-expense-card';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
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
            <SummaryCard icon={User} title="Active members" value={6} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={DollarIcon} title="Member Capitals" value={formatToCurrency(150000)} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={LoanIcon} title="Active loans" value={250} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
              xl: 3,
            }}
          >
            <SummaryCard icon={EarningIcon} title="Net earnings" value={250} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 8,
            }}
          >
            <RevenueExpenseCard />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
