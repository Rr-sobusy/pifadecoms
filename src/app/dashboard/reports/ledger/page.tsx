import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';

import { paths } from '@/paths';
import { fetchInvoices } from '@/actions/invoices/fetch-invoice';
import { fetchLedgers } from '@/actions/reports/general-ledger';
import InvoiceTable from '@/components/dashboard/invoice/_invoice-table';
import { InvoicesFiltersCard } from '@/components/dashboard/invoice/invoices-filters-card';
import { InvoicesStats } from '@/components/dashboard/invoice/invoices-stats';
import GeneralLedgerTable from '@/components/dashboard/reports/ledgers/general-ledger-table';

type PageProps = {};

async function page({}: PageProps): Promise<React.JSX.Element> {
  const generalLedgers = await fetchLedgers();
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
            <Typography variant="h4">General Ledger</Typography>
          </Box>

          <div>
            <Button startIcon={<FilterIcon />} variant="outlined">
              Filter by Date range
            </Button>
          </div>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer's Development Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            General Ledger of Accounts
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From Nov 01 2024 to Nov 31 2024
          </Typography>

          <Card sx={{ marginTop: 3 }}>
            <CardContent>
              <GeneralLedgerTable rows={generalLedgers} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
