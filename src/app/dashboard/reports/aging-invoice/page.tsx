import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fetchAgingInvoiceItemsPerMember } from '@/actions/invoices/aging-invoice';
import type { Metadata } from 'next';
import PrintableAgingInvoiceReport from '@/components/dashboard/reports/aging-invoice/printable-aging-invoice';


export const metadata:Metadata = {
  title : "Reports || Aging Invoice"
}

async function page() {
  const test = await fetchAgingInvoiceItemsPerMember();
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
            <Typography variant="h4">Aging Invoices</Typography>
          </Box>
        </Stack>
        <PrintableAgingInvoiceReport data={test} />
      </Stack>
    </Box>
  );
}

export default page;
