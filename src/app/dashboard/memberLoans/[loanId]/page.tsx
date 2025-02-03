import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CurrencyRub as PayIcon } from '@phosphor-icons/react/dist/ssr/CurrencyRub';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';

import { paths } from '@/paths';
import { fetchLoanDetails } from '@/actions/loans/fetch-loans';
import LoanDetailsCard from '@/components/dashboard/member-loans/loan-details-card';

interface PageProps {
  params: { loanId: bigint };
}

async function page({ params }: PageProps): Promise<React.JSX.Element> {
  const loanId = params?.loanId;
  const loanDetails = await fetchLoanDetails(loanId);

  if (!loanDetails) {
    return (
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Typography>No loan record found!</Typography>
      </Box>
    );
  }

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
            <Link
              component={RouterLink}
              color="text.primary"
              href={paths.dashboard.loans.list}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Loan Lists
            </Link>
          </div>
          <Typography variant="h4">Loan-{params.loanId.toString().padStart(6, '0')}</Typography>
        </Stack>
        <LoanDetailsCard sx={{ p: 6 }} loanDetails={loanDetails} />
      </Stack>
    </Box>
  );
}

export default page;
