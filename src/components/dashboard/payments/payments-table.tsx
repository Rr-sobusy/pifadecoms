'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { generatedSeries } from '@/lib/format-generated-series';
import { type PaymentsType } from '@/actions/invoice-payments/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import DeletePaymentButton from './delete-payment-button';

interface Props {
  rows: PaymentsType;
}

const columns = [
  {
    formatter: (row) => <>{dayjs(row.JournalEntry.entryDate).format('MMM DD YYYY')}</>,
    name: 'Payment Date',
    width: '80px',
  },
  {
    formatter: (row) => <Stack>{generatedSeries(row.itemsPaymentId, 'RPay-')}</Stack>,
    name: 'Payment No.',
    width: '70px',
  },
  {
    formatter: (row) => <Stack>{generatedSeries(row.InvoiceItem.Invoice.invoiceId, 'INV-')}</Stack>,
    name: 'Invoice No.',
    width: '70px',
  },
  {
    formatter: (row) => <Stack>{row.JournalEntry.referenceName}</Stack>,
    name: 'Reference No.',
    width: '70px',
  },
  {
    formatter: (row) => (
      <Stack>{row.InvoiceItem.Invoice.Members.lastName + ', ' + row.InvoiceItem.Invoice.Members.firstName}</Stack>
    ),
    name: 'Member',
    width: '150px',
  },
  {
    formatter: (row) => (
      <Stack>
        {formatToCurrency(
          Number(row.interestPaid) + Number(row.principalPaid) + Number(row.tradingPaid),
          'Fil-ph',
          'Php'
        )}
      </Stack>
    ),
    name: 'Payment Received',
    width: '100px',
  },
  {
    formatter: (row) => <Stack>{row.InvoiceItem.Item.itemName}</Stack>,
    name: 'Payment for',
    width: '100px',
  },
] satisfies ColumnDef<PaymentsType[0]>[];

function PaymentsTable({ rows }: Props) {
  const [selectedRows, setSelectedRows] = React.useState<PaymentsType>([]);

  function handleSelectOne(_: React.ChangeEvent, row: PaymentsType[0]) {
    setSelectedRows((prev) => {
      const isSelected = prev.some((_prev) => _prev.itemsPaymentId === row.itemsPaymentId);

      return isSelected
        ? prev.filter((currentRow) => currentRow.itemsPaymentId !== row.itemsPaymentId)
        : [...prev, row];
    });
  }

  return (
    <Card sx={{ overflowX: 'auto' }}>
      <Stack padding={3} alignItems="flex-end">
        <DeletePaymentButton paymentIds={selectedRows.map((row) => row.itemsPaymentId)} />
      </Stack>
      <DataTable<PaymentsType[0]>
        selected={new Set(selectedRows.map((prev) => Number(prev.itemsPaymentId)))}
        uniqueRowId={(row) => Number(row.itemsPaymentId)}
        onSelectOne={handleSelectOne}
        onDeselectOne={handleSelectOne}
        selectable
        columns={columns}
        rows={rows}
      />
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
