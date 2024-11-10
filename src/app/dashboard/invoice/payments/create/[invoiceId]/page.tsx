import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { fetchSingleInvoice } from '@/actions/invoices/fetch-invoice';
import InvoicePaymentForm from '@/components/dashboard/payments/invoice-payment-form';

type PageProps = {
  params: { invoiceId: bigint };
};

const page = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const { invoiceId } = params;
  const invoiceDetails = await fetchSingleInvoice(invoiceId);
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
              color="text.primary"
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Invoices
            </Link>
          </div>
          <div>
            <Typography variant="h4">Create Payment</Typography>
          </div>
        </Stack>
        <InvoicePaymentForm value={invoiceDetails} />
      </Stack>
    </Box>
  );
};

export default page;
