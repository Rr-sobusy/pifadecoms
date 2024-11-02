'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { type InvoiceType } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { formatToCurrency } from '@/lib/format-currency';

type InvoiceTableProps = {
  rows: InvoiceType;
};


const dueMonth = 1

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack
        component={RouterLink}
        direction="row"
        href={paths.dashboard.invoices.details('1')}
        spacing={2}
        sx={{ alignItems: 'center', display: 'inline-flex', textDecoration: 'none', whiteSpace: 'nowrap' }}
      >
        <div>
        <Typography color="text.primary" variant="subtitle2">
            {'INV-' + row.invoiceId.toString().padStart(6, "0")}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {row.Members.lastName + ', ' + row.Members.firstName}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Member Name',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Base Total</Typography>
        <Typography variant="body2">{formatToCurrency(row.baseGrandTotal, 'Fil-ph', 'Php')}</Typography>
      </div>
    ),
    name: 'Grand Total',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Amount Due</Typography>
        <Typography variant="body2">{formatToCurrency(row.outStandingAmt, 'Fil-ph', 'Php')}</Typography>
      </div>
    ),
    name: 'Total amount',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Issued</Typography>
        <Typography variant="body2">{dayjs(row.dateOfInvoice).format('MMM DD YYYY')}</Typography>
      </div>
    ),
    name: 'Total amount',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Due</Typography>
        <Typography variant="body2">{dayjs(dayjs(row.dateOfInvoice).add(dueMonth, 'M')).format('MMM DD YYYY')}</Typography>
      </div>
    ),
    name: 'Total amount',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        paid: { label: 'Paid', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
        canceled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
      } as const;
      const { label, icon } = row.outStandingAmt !== 0 ? mapping["pending"] : mapping["paid"]

      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Status',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton component={RouterLink} href={paths.dashboard.invoices.details('1')}>
        <ArrowRightIcon />
      </IconButton>
    ),
    name: 'Actions',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<InvoiceType[0]>[];

const InvoiceTable = ({ rows }: InvoiceTableProps) => {
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable<InvoiceType[0]> columns={columns} hideHead rows={rows} />
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
