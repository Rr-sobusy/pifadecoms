import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fetchIncomeAndLossReport } from '@/actions/reports/income-and-loss';
import IncomeAndLossFiltererModal from '@/components/dashboard/reports/income-loss/filterer-modal';
import PrintableIncomeStatement from '@/components/dashboard/reports/income-loss/printable-income-statement';
import type { Metadata } from 'next';

interface PageProps {
  searchParams: { startDate?: Date | string; endDate?: Date | string; isFilterOpen: boolean };
}

export const metadata:Metadata = {
  title : "Reports || Statement of Income and Loss"
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { startDate, endDate, isFilterOpen } = searchParams;
  const income = await fetchIncomeAndLossReport({ startDate, endDate });
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
            <Typography variant="h4">Income/Loss Statement</Typography>
          </Box>
        </Stack>

        <PrintableIncomeStatement searchParams={searchParams} incomeAndLoss={income} />
      </Stack>
      <IncomeAndLossFiltererModal open={Boolean(isFilterOpen)} />
    </Box>
  );
}

export default page;
