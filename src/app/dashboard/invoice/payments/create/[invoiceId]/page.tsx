import * as React from 'react';
import RouterLink from 'next/link';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { fetchSingleInvoice } from '@/actions/invoices/fetch-invoice';
import InvoicePaymentForm from '@/components/dashboard/payments/invoice-payment-form';

interface PageProps {
  params: { invoiceId: bigint };
}

const page = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const { invoiceId } = params;
  const invoiceDetails = await fetchSingleInvoice(invoiceId);
  const accountTree = await fetchAccountTree();

  if (invoiceDetails?.outStandingAmt === 0) {
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
                href={paths.dashboard.invoice.list}
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
          <Typography>Payment of this Invoice are already settled!</Typography>
        </Stack>
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
              href={paths.dashboard.invoice.list}
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
        <InvoicePaymentForm accounts={accountTree} invoiceDetails={invoiceDetails} />
      </Stack>
    </Box>
  );
};
export default page;
