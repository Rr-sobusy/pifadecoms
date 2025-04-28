import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchLoanSources } from '@/actions/loans/fetch-loan-source';
import AddLoanSourceDialog from '@/components/dashboard/member-loans/add-loan-source-dialog';
import LoanSourceTable from '@/components/dashboard/member-loans/loan-source-table';

interface PageProps {
  searchParams: { createNew: boolean };
}

async function page({ searchParams }: PageProps) {
  const [loanSources, accounts] = await Promise.all([fetchLoanSources(), fetchAccountTree()]);

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
            <Typography variant="h4">Loan Sources</Typography>
          </Box>
          <div>
            <Button
              component={RouterLink}
              href={`${paths.dashboard.loans.source}?createNew=true`}
              startIcon={<PlusIcon />}
              variant="contained"
            >
              Add
            </Button>
          </div>
        </Stack>
        <Stack>
          <LoanSourceTable loanSources={loanSources} />
        </Stack>
        <AddLoanSourceDialog accounts={accounts} isOpen={Boolean(searchParams.createNew)} />
      </Stack>
    </Box>
  );
}

export default page;
