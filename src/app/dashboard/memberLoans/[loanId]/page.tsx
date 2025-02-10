import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CurrencyRub as PayIcon } from '@phosphor-icons/react/dist/ssr/CurrencyRub';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr/Printer';

import { paths } from '@/paths';
import { fetchLoanDetails } from '@/actions/loans/fetch-loans';
import LoanAmortizationDetails from '@/components/dashboard/member-loans/loan-amortization-details-card';
import LoanDetailsCard from '@/components/dashboard/member-loans/loan-details-card';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import type { AccounTreeType } from '@/actions/accounts/types';
interface PageProps {
  params: { loanId: bigint };
}

async function page({ params }: PageProps): Promise<React.JSX.Element> {
  const loanId = params?.loanId;
  const [loanDetails, accounts] = await Promise.all([fetchLoanDetails(loanId), fetchAccountTree()]);

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
          <div>
            <Chip label="Pending" />
          </div>
        </Stack>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <LoanDetailsCard sx={{ p: 3 }} loanDetails={loanDetails} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <LoanAmortizationDetails accounts={accounts} sx={{ p: 3 }} loanDetails={loanDetails} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default page;

