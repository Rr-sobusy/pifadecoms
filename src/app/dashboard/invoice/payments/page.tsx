import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fetchReceivedPayments } from '@/actions/invoice-payments/fetch-payments';
import PaymentsTable from '@/components/dashboard/payments/payments-table';

async function page(): Promise<React.JSX.Element> {
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
        </Stack>
        <Stack spacing={4}>
          <PaymentsTable rows={receivedPayments} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
