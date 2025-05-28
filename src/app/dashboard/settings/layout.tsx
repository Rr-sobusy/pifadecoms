import * as React from 'react';
import Box from '@mui/material/Box';
import { fetchAgingInvoiceItemsPerMember } from '@/actions/invoices/aging-invoice';
import AgingInvoiceTable from '@/components/dashboard/reports/aging-invoice/aging-invoice-table';
// interface LayoutProps {}

export default async function Layout(): Promise<React.JSX.Element> {
  const test = await fetchAgingInvoiceItemsPerMember()
  return (
    // <Box
    //   sx={{
    //     maxWidth: 'var(--Content-maxWidth)',
    //     m: 'var(--Content-margin)',
    //     p: 'var(--Content-padding)',
    //     width: 'var(--Content-width)',
    //   }}
    // >
    //   <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
    //     <SideNav />
    //     <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
    //   </Stack>
    // </Box>
    <Box>Construction on-going.
      <AgingInvoiceTable data={test} />
    </Box>
  );
}
