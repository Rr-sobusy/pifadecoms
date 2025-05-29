import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchLoanSources } from '@/actions/loans/fetch-loan-source';
import { fetchLoans } from '@/actions/loans/fetch-loans';
import LoanFilters from '@/components/dashboard/member-loans/loan-filters';
import { LoanTable } from '@/components/dashboard/member-loans/loan-table';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "PIFADECO | Loan lists"
}

interface PageProps {
  searchParams: {
    memberId?: string;
    loanId?: number;
    status?: 'Active' | 'Closed';
    sourceId?: number;
    contractType?: 'StraightPayment' | 'Diminishing' | 'OneTime';
    releasedDateFrom?: Date;
    releasedDateTo?: Date;
    dueDate?: Date | string;
  };
}

async function page(props: PageProps): Promise<React.ReactElement> {
  const { memberId, loanId, status, sourceId, contractType, releasedDateFrom, releasedDateTo, dueDate } =
    props.searchParams;
  const filters = { memberId, loanId, status, sourceId, contractType, releasedDateFrom, releasedDateTo, dueDate };
  const [loans, loanSource] = await Promise.all([fetchLoans(filters), fetchLoanSources()]);
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
          <LoanFilters loanSource={loanSource} />
          <Stack spacing={4} sx={{ flex: '1 1 auto', minWidth: 0 }}>
            <LoanTable rows={loans} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
