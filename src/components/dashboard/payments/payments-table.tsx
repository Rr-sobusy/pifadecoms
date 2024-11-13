'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { generatedSeries } from '@/lib/format-generated-series';
import { type PaymentsType } from '@/actions/invoice-payments/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type Props = {
  rows: PaymentsType;
};

const columns = [
  {
    formatter: (row) => <Stack>{dayjs(row.paymentDate).format('MMM DD YYYY')}</Stack>,
    name: 'Payment Date',
    width: '80px',
  },
  {
    formatter: (row) => <Stack>{generatedSeries(row.paymentId, 'RPay-')}</Stack>,
    name: 'Payment No.',
    width: '70px',
  },
  {
    formatter: (row) => <Stack>{generatedSeries(row.invoiceId, 'INV-')}</Stack>,
    name: 'Invoice No.',
    width: '70px',
  },
  {
    formatter: (row) => <Stack>{row.orNo}</Stack>,
    name: 'Reference No.',
    width: '70px',
  },
  {
    formatter: (row) => <Stack>{row.Invoice.Members.lastName + ', ' + row.Invoice.Members.firstName}</Stack>,
    name: 'Member',
    width: '150px',
  },
  {
    formatter: (row) => <Stack>{formatToCurrency(row.paymentReceived, 'Fil-ph', 'Php')}</Stack>,
    name: 'Payment Received',
    width: '100px',
  },
  {
    formatter: (row) => (
      <Chip
        icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
        size="small"
        variant="outlined"
        label={row.JournalEntry.JournalItems[0].Accounts.accountName}
      />
    ),
    name: 'Posting account',
    width: '100px',
  },
] satisfies ColumnDef<PaymentsType[0]>[];

function PaymentsTable({ rows }: Props) {
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable<PaymentsType[0]> columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No payment posted
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
}

export default PaymentsTable;
