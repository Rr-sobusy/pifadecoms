import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { fetchSingleInvoice } from '@/actions/invoices/fetch-invoice';
import type { InvoiceItemsWithItem } from '@/actions/invoices/types';
import { DynamicLogo } from '@/components/core/logo';
import { InvoicePDFLink } from '@/components/dashboard/invoice/invoice-pdf-link';
import { LineItemsTable } from '@/components/dashboard/invoice/line-items-table';

export const metadata = { title: `Details | Invoices | Dashboard | ${config.site.name}` } satisfies Metadata;

type PageProps = {
  params: { invoiceId: bigint };
};

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const invoiceDetails = await fetchSingleInvoice(params.invoiceId);

  const invDueDate = dayjs(dayjs(invoiceDetails?.dateOfInvoice).add(1, 'M')).format('MMM DD,YYYY');

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
              component={RouterLink}
              href={paths.dashboard.invoice.list}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Invoices
            </Link>
          </div>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="h4">INV-{params.invoiceId.toString().padStart(6, '0')}</Typography>
              <div>
                <Chip color="warning" label="Pending" variant="soft" />
              </div>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <InvoicePDFLink invoice={undefined}>
                <Button disabled color="secondary">
                  Download
                </Button>
              </InvoicePDFLink>
              <Button disabled component="a" href={paths.pdf.invoice('1')} target="_blank" variant="contained">
                Preview
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Card sx={{ p: 6 }}>
          <Stack spacing={6}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography variant="h4">Invoice</Typography>
              </Box>
              <Box sx={{ flex: '0 0 auto' }}>
                <DynamicLogo colorDark="light" colorLight="dark" emblem height={60} width={60} />
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: '0 1 150px' }}>
                  <Typography variant="subtitle2">Number:</Typography>
                </Box>
                <div>
                  <Typography variant="body2">INV-{params.invoiceId.toString().padStart(6, '0')}</Typography>
                </div>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: '0 1 150px' }}>
                  <Typography variant="subtitle2">Due date:</Typography>
                </Box>
                <div>
                  <Typography variant="body2">{invDueDate}</Typography>
                </div>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: '0 1 150px' }}>
                  <Typography variant="subtitle2">Issue date:</Typography>
                </Box>
                <div>
                  <Typography variant="body2">{dayjs(invoiceDetails?.dateOfInvoice).format('MMM DD YYYY')}</Typography>
                </div>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: '0 1 150px' }}>
                  <Typography variant="subtitle2">Issuer VAT No:</Typography>
                </Box>
                <Typography variant="body2"> -</Typography>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Pinagsibaan Farmer's Development Cooperative</Typography>
                  <Typography variant="body2">
                    Pinagsibaan, Rosario, Batangas
                    <br />
                    Philippines, 4225
                    <br />
                    (+1) 757 737 1980
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Billed to</Typography>
                  <Typography variant="body2">
                    {`${invoiceDetails?.Members.lastName}, ${invoiceDetails?.Members.firstName}`}
                    <br />
                    {invoiceDetails?.Members.address}
                    <br />
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <div>
              <Typography variant="h5">
                {`${formatToCurrency(invoiceDetails?.baseGrandTotal === undefined ? 0 : invoiceDetails?.baseGrandTotal, 'Fil-ph', 'Php')} due on ${invDueDate}`}
              </Typography>
            </div>
            <Stack spacing={2}>
              <Card sx={{ borderRadius: 1, overflowX: 'auto' }} variant="outlined">
                <LineItemsTable data={invoiceDetails?.InvoiceItems as InvoiceItemsWithItem['InvoiceItems']} />
              </Card>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography>Subtotal</Typography>
                  </Box>
                  <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                    <Typography>
                      {formatToCurrency(
                        invoiceDetails?.baseGrandTotal === undefined ? 0 : invoiceDetails?.baseGrandTotal,
                        'Fil-ph',
                        'Php'
                      )}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography>Tax</Typography>
                  </Box>
                  <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                    <Typography>-</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography variant="h6">Total</Typography>
                  </Box>
                  <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                    <Typography variant="h6">
                      {formatToCurrency(
                        invoiceDetails?.baseGrandTotal === undefined ? 0 : invoiceDetails?.baseGrandTotal,
                        'Fil-ph',
                        'Php'
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h6">Notes</Typography>
              <Typography color="text.secondary" variant="body2">
                This is a system generated invoice. Please make sure that all the data stated above are accurate before
                proceed for payment.
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
