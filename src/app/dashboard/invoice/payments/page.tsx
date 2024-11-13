import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { fetchReceivedPayments } from '@/actions/invoice-payments/fetch-payments';
import PaymentsTable from '@/components/dashboard/payments/payments-table';

type PageProps = {};

async function page({}: PageProps): Promise<React.JSX.Element> {
  const receivedPayments = await fetchReceivedPayments();
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
            <Typography variant="h4">Received Payments</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href={paths.dashboard.invoice.create} variant="contained"></Button>
          </Box>
        </Stack>
        <Stack spacing={4}>
          <PaymentsTable rows={receivedPayments} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
