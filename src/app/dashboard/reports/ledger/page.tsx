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
import { fetchLedgers } from '@/actions/reports/general-ledger';
import DateRangeBtn from '@/components/dashboard/reports/ledgers/date-range-button';
import GeneralLedgerTable from '@/components/dashboard/reports/ledgers/general-ledger-table';

type PageProps = {
  searchParams: { startDate: string; endDate: string };
};

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const generalLedgers = await fetchLedgers({ dateRange: searchParams });
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
            <Typography variant="h4">General Ledger</Typography>
          </Box>

          <div>
            <DateRangeBtn />
          </div>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer's Development Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            General Ledger of Accounts
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From{' '}
            {searchParams.startDate
              ? dayjs(searchParams.startDate).format('MMM DD YYYY')
              : dayjs().subtract(30, 'day').format('MMM DD YYYY')}{' '}
            to{' '}
            {searchParams.endDate ? dayjs(searchParams.endDate).format('MMM DD YYYY') : dayjs().format('MMM DD YYYY')}
          </Typography>

          <Card sx={{ marginTop: 3 }}>
            <CardContent>
              <GeneralLedgerTable rows={generalLedgers} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
