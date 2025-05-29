import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchLoanSources } from '@/actions/loans/fetch-loan-source';
import CreateNewLoan from '@/components/dashboard/member-loans/new-loan-form';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "PIFADECO | New loan"
}

const page = async () => {
  // const members = await fetchMembers({ returnAll: true });
  // const items = await fetchItems();
  const [accounts, loanSources] = await Promise.all([fetchAccountTree(), fetchLoanSources()]);
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
        <Stack spacing={3}>
          <div>
            <Typography
              component={RouterLink}
              href={paths.dashboard.loans.list}
              color="text.primary"
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Loans List
            </Typography>
          </div>
          <div>
            <Typography variant="h4">Create New Loan</Typography>
          </div>
        </Stack>
        <CreateNewLoan loanSources={loanSources} accounts={accounts} />
      </Stack>
    </Box>
  );
};

export default page;
