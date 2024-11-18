import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import { fetchAccountTransactions } from '@/actions/reports/account-transactions';
import TransactionsTable from '@/components/dashboard/reports/transactions/account-transactions-table';

type PageProps = {};

async function page({}: PageProps): Promise<React.JSX.Element> {
  const accountTransactions = await fetchAccountTransactions();
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
            <Typography variant="h4">Account Transactions</Typography>
          </Box>

          <div>rex</div>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer's Development Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            Summary of Account's Transactions
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From{' '}
            {/* {searchParams.startDate
            ? dayjs(searchParams.startDate).format('MMM DD YYYY')
            : dayjs().subtract(30, 'day').format('MMM DD YYYY')}{' '}
          to{' '}
          {searchParams.endDate ? dayjs(searchParams.endDate).format('MMM DD YYYY') : dayjs().format('MMM DD YYYY')} */}
          </Typography>
        </Stack>

        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ overflowX: 'auto' }}>
            <TransactionsTable accountTransactions={accountTransactions} />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

export default page;
