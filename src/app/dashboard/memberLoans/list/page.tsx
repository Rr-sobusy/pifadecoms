import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchLoans } from '@/actions/loans/fetch-loans';
import { LoanTable } from '@/components/dashboard/member-loans/loan-table';
import LoanFilters from '@/components/dashboard/member-loans/loan-filters';

async function page(): Promise<React.ReactElement> {
  const [loans] = await Promise.all([fetchLoans()]);
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
            <Typography variant="h4">Loan lists</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={Link} href={paths.dashboard.loans.create} variant="contained">
              Create New Loan
            </Button>
          </Box>
        </Stack>
        <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
          {/* <InvoicesFiltersCard filters={filters} /> */}
          <LoanFilters />
          <Stack spacing={4} sx={{ flex: '1 1 auto', minWidth: 0 }}>
            <LoanTable rows={loans} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
