import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoanCalculator from '@/components/dashboard/member-loans/loan-calculator';
import type { Metadata } from 'next';


export const metadata:Metadata = {
  title : "PIFADECO | Loan calculator"
}

function page() {
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
            <Typography variant="h4">Loan Calculator</Typography>
          </Box>
        </Stack>
        <Stack>
          <LoanCalculator />
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
