import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchLoanSources } from '@/actions/loans/fetch-loan-source';
import CreateExistingLoan from '@/components/dashboard/member-loans/existing-loan-form';

const page = async () => {

  const loanSources = await fetchLoanSources();
  
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
              href={paths.dashboard.finance.list}
              color="text.primary"
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Loans List
            </Typography>
          </div>
          <div>
            <Typography variant="h4">Create Existing Loan</Typography>
          </div>
        </Stack>
        <CreateExistingLoan loanSources={loanSources} />
      </Stack>
    </Box>
  );
};

export default page;
