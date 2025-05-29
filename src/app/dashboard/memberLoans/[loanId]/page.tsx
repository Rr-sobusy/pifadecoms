import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Printer } from '@phosphor-icons/react/dist/ssr';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchLoanDetails } from '@/actions/loans/fetch-loans';
import LoanAmortizationDetails from '@/components/dashboard/member-loans/loan-amortization-details-card';
import LoanDetailsCard from '@/components/dashboard/member-loans/loan-details-card';
import LoanNotes from '@/components/dashboard/member-loans/loan-notes';
import OptionsPopoverButton from '@/components/dashboard/member-loans/option-popover-button';
import { auth } from '@/auth';
import { Roles } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "PIFADECO | Loan Details"
}

interface PageProps {
  params: { loanId: bigint };
}

async function page({ params }: PageProps): Promise<React.JSX.Element> {
  const loanId = params?.loanId;
  const [loanDetails, accounts, session] = await Promise.all([fetchLoanDetails(loanId), fetchAccountTree(), auth()]);

  const isAdmin = session?.user.role === "Admin" as Roles

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
        <Stack flexDirection="row" justifyContent="space-between">
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
              <Chip
                color={loanDetails.loanStatus === 'Active' ? 'success' : 'error'}
                label={loanDetails.loanStatus === 'Active' ? 'Active' : 'Closed'}
              />
            </div>
          </Stack>
          <div>
            <Stack gap={2} direction="row">
              <OptionsPopoverButton loanId={loanDetails?.loanId} isAdmin={isAdmin} />
              <Button
                target="_blank"
                LinkComponent={RouterLink}
                href={paths.dashboard.loans.viewPdf(loanDetails.loanId)}
                startIcon={<Printer />}
                variant="text"
              >
                View Amortizations
              </Button>
            </Stack>
          </div>
        </Stack>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Stack spacing={3}>
              <LoanDetailsCard sx={{ p: 3 }} loanDetails={loanDetails} />
              <LoanNotes notes={loanDetails?.notes} loanId={loanDetails?.loanId} />
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <LoanAmortizationDetails isAdmin={isAdmin} accounts={accounts} sx={{ p: 3 }} loanDetails={loanDetails} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default page;
