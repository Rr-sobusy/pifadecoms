import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { getBalanceSheet } from '@/actions/reports/balance-sheet';
import BalanceSheetFilterModal from '@/components/dashboard/reports/balancesheet/filter-modal';
import PrintableBalanceSheet from '@/components/dashboard/reports/balancesheet/printable-balance-table';

interface PageProps {
  searchParams: { filterList: boolean; asOf?: Date | string };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { filterList, asOf } = searchParams;

  const balances = await getBalanceSheet(asOf ? dayjs(asOf).endOf('day').toDate() : undefined);

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
            <Typography variant="h4">Balance Sheet</Typography>
          </Box>
        </Stack>
        <PrintableBalanceSheet balances={balances} />
      </Stack>
      <BalanceSheetFilterModal open={Boolean(filterList)} />
    </Box>
  );
}

export default page;
