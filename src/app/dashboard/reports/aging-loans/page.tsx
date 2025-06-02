import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AgingLoanTable from '@/components/dashboard/reports/aging-loans/aging-loan-table';
import { fetchAgingLoanPerMember } from '@/actions/loans/aging-loans';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "Reports || Aging Loans"
}


async function page() {
  const agingLoans = await fetchAgingLoanPerMember()
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
            <Typography variant="h4">Aging Loans</Typography>
          </Box>
        </Stack>
        <AgingLoanTable data={agingLoans} />
      </Stack>
    </Box>
  );
}

export default page;
