import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchItems } from '@/actions/items/fetch-items';
import { fetchMembers } from '@/actions/members/fetch-members';
import InvoiceCreateForm2 from '@/components/dashboard/invoice/_invoice-create-form';
import LoanCreateForm from '@/components/dashboard/member-loans/loan-create-form';

const page = async () => {
  const members = await fetchMembers({ returnAll: true });
  const items = await fetchItems();
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
              href={paths.dashboard.invoice.list}
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
        <LoanCreateForm />
      </Stack>
    </Box>
  );
};

export default page;
