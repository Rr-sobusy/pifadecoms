'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr/Notepad';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { type InvoiceType } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

interface InvoiceTableProps {
  rows: InvoiceType['invoice'];
}


const columns = [
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        unpaid: { label: 'Unpaid', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        paid: { label: 'Paid', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
      } as const;

      const totalPaid = row.InvoiceItems.map((invoiceItem) => {
        let totalPayment = 0;
        for (const payment of invoiceItem.ItemPayment) {
          totalPayment += Number(payment.principalPaid) + Number(payment.tradingPaid);
        }
        return { ...invoiceItem, payment: totalPayment };
      }).reduce((acc, curr) => acc + curr.payment, 0);

      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );

      function getMapping() {
        if (totalBalanceDue <= totalPaid) return mapping['paid'];
        return mapping['unpaid'];
      }

      const { label, icon } = getMapping();

      return (
        <Stack
          component={RouterLink}
          direction="row"
          href={paths.dashboard.invoice.details(row.invoiceId)}
          spacing={2}
          sx={{ alignItems: 'center', display: 'inline-flex', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          <div>
            <Stack direction="row" alignItems={`center`} gap={2}>
              <Typography color="text.primary" variant="subtitle2">
                {'INV-' + row.invoiceId.toString().padStart(6, '0')}
              </Typography>
              <Chip icon={icon} label={label} size="small" variant="outlined" />
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {row.Members.lastName + ', ' + row.Members.firstName}
            </Typography>
          </div>
        </Stack>
      );
    },
    name: 'Member Name',
    width: '10%',
  },
  {
    formatter: (row): React.JSX.Element => {
      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );
      return (
        <div>
          <Typography variant="subtitle2">Base Total</Typography>
          <Typography color="text.secondary" variant="body2">
            {formatToCurrency(totalBalanceDue, 'Fil-ph', 'Php')}
          </Typography>
        </div>
      );
    },
    name: 'Grand Total',
    width: '50px',
  },
  {
    formatter: (row): React.JSX.Element => {
      return (
        <div>
          <Typography variant="subtitle2">Invoice Items</Typography>
          <Stack direction="column">
            {row.InvoiceItems.map((item) => (
              <Typography key={item.invoiceItemId} variant="caption">{`${item.quantity} ${item.Item.itemName},  Principal:${formatToCurrency(item.principalPrice)}, Trade:${formatToCurrency(item.trade)}`}</Typography>
            ))}
          </Stack>
        </div>
      );
    },
    name: 'Total balance',
    width: '400px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Issued</Typography>
        <Typography color="text.secondary" variant="body2">
          {dayjs(row.dateOfInvoice).format('MMM DD YYYY')}
        </Typography>
      </div>
    ),
    name: 'Date Issued',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => {
      return (
        <IconButton LinkComponent={Link} href={paths.dashboard.invoice.details(row.invoiceId)}>
          <Info />
        </IconButton>
      );
    },
    name: 'Actions',
    width: '10px',
    align: 'right',
  },
] satisfies ColumnDef<InvoiceType['invoice'][0]>[];

const InvoiceTable = ({ rows }: InvoiceTableProps) => {
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable<InvoiceType['invoice'][0]> hover columns={columns} hideHead rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No invoices found
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
};

export default InvoiceTable;
