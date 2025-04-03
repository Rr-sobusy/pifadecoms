import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchInvoices } from '@/actions/invoices/fetch-invoice';
import InvoiceTable from '@/components/dashboard/invoice/_invoice-table';
import InfiniteScroll from '@/components/dashboard/invoice/invoice-infinite-scroll';
import { InvoicesFiltersCard } from '@/components/dashboard/invoice/invoices-filters-card';

interface PageProps {
  searchParams: {
    memberId?: string;
    endDate?: Date;
    invoiceId?: number;
    startDate?: Date;
    status?: string;
    cursor?: string;
  };
}

export const metadata: Metadata = {
  title: 'PIFADECO | Invoice list',
};

const page = async ({ searchParams }: PageProps) => {
  const { memberId, endDate, invoiceId, startDate, status, cursor } = searchParams;
  const filters = { memberId, endDate, invoiceId, startDate, status , cursor};
  const invoices = await fetchInvoices(filters);

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
            <Typography variant="h4">Invoices</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href={paths.dashboard.invoice.create} variant="contained">
              Create New Invoice
            </Button>
          </Box>
        </Stack>
        {/* <InvoicesStats /> */}
        <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
          <InvoicesFiltersCard filters={filters} />
          <Stack spacing={4} sx={{ flex: '1 1 auto', minWidth: 0 }}>
            <InvoiceTable rows={invoices.invoice} />
            <InfiniteScroll invoices={invoices.invoice} nextCursor={String(invoices.nextCursor)} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default page;
