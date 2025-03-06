'use client';

import React from 'react';
import { CardContent, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { AccounTreeType } from '@/actions/accounts/types';
import type { InvoiceItemPerMemberTypes } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import InvoiceItemPaymentDialog from './_invoice-item-payment-dialog';

const dueMonth = 1;

function isPastDue(inputtedDate: Date): boolean {
  return !dayjs(inputtedDate).add(dueMonth, 'M').isSameOrAfter(dayjs(), 'D');
}

function computeInterest(inputtedDate: Date, principalAmout: number, rate: number): number {
  const numberOfMonthsPast = dayjs(inputtedDate).add(dueMonth, 'M').diff(dayjs(), 'M');

  return (rate / 100) * principalAmout * (numberOfMonthsPast - 1) * -1;
}

type PageProps = {
  data: InvoiceItemPerMemberTypes;
  accounts: AccounTreeType;
};

const columns = [
  {
    name: 'Invoice Id',
    formatter: (row) => {
      return (
        <Stack>
          <Typography variant="subtitle2">{`INV-${row.invoiceId.toString().padStart(6, '0')}`}</Typography>
          {row.isTotallyPaid && (
            <Chip label="Paid" color="success" variant="outlined" icon={<CheckCircleIcon />} size="small" />
          )}
        </Stack>
      );
    },
    width: '100px',
  },
  {
    name: 'Date of invoice',
    formatter: (row) => {
      return <Typography variant="subtitle2">{dayjs(row.Invoice?.dateOfInvoice).format('MMM DD YYYY')}</Typography>;
    },
  },
  {
    name: 'Item Source',
    formatter: (row) => {
      return <Typography variant="subtitle2">{row.Item.ItemSource.sourceName}</Typography>;
    },
  },
  {
    name: 'Item name',
    formatter: (row) => {
      return <Typography variant="subtitle2">{row.Item.itemName}</Typography>;
    },
  },
  {
    name: 'Qty. Purchased',
    formatter: (row) => {
      return (
        <Stack direction="row">
          <Typography variant="subtitle2">{row.quantity.toString()}</Typography>
        </Stack>
      );
    },
  },
  {
    name: 'Item Amount',
    formatter: (row) => {
      return <Typography variant="subtitle2">{formatToCurrency(row.principalPrice, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Trade',
    formatter: (row) => {
      return <Typography variant="subtitle2">{formatToCurrency(row.trade, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Total amount',
    formatter: (row) => {
      const totalAmountPayable = row.quantity * (row.trade + row.principalPrice);
      return (
        <Typography color="error" variant="subtitle2">
          {formatToCurrency(totalAmountPayable, 'Fil-ph', 'Php')}
        </Typography>
      );
    },
  },
  {
    name: 'Int. accrued (2%)',
    formatter: (row) => {
      const totalAmountDue = row.Item.sellingPrice + row.Item.trade;
      return (
        <Typography variant="subtitle2">
          {isPastDue(row.Invoice.dateOfInvoice) && !row.isTotallyPaid
            ? `${formatToCurrency(computeInterest(row.Invoice.dateOfInvoice, totalAmountDue, 2), 'Fil-ph', 'Php')} due for ${dayjs(row.Invoice.dateOfInvoice).diff(dayjs(), 'M') * -1} months`
            : formatToCurrency(0, 'Fil-ph', 'Php')}
        
        </Typography>
      );
    },
  },
  {
    name: 'Principal Paid',
    formatter: (row, index) => {
      const totalPrincipalPaid = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.principalPaid), 0);
      return <Typography color="error">{formatToCurrency(totalPrincipalPaid, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Interest Paid',
    formatter: (row, index) => {
      const totalInterestPaid = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.interestPaid), 0);
      return <Typography color="error">{formatToCurrency(totalInterestPaid, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Payment O.R/s',
    formatter: (row) => {
      const paymentOr = row.ItemPayment.map((payments) => payments.JournalEntry.referenceName);

      return <Typography variant="subtitle2">{paymentOr.join(',')}</Typography>;
    },
  },
] satisfies ColumnDef<InvoiceItemPerMemberTypes[0]>[];

function InvoiceItemTable({ data, accounts }: PageProps) {
  const [selectedRows, setSelectedRows] = React.useState<InvoiceItemPerMemberTypes[0][]>([]);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = React.useState<boolean>(false);

  function handleSelectOne(_: React.ChangeEvent, row: InvoiceItemPerMemberTypes[0]) {
    setSelectedRows((prevSelected) => {
      const isAlreadySelected = prevSelected.some((ctx) => ctx.invoiceItemId === row.invoiceItemId);

      return isAlreadySelected
        ? prevSelected.filter((ctx) => ctx.invoiceItemId !== row.invoiceId)
        : [...prevSelected, row];
    });
  }

  function togglePaymentDialog(): void {
    setPaymentDialogOpen((prev) => !prev);
  }

  const computedData = React.useMemo(() => data, [data]);

  return (
    <>
      <Card>
        <CardContent>
          <Stack paddingY={3} alignItems="flex-end">
            <Button onClick={togglePaymentDialog} disabled={selectedRows.length < 1} variant="contained">
              Create payment
            </Button>
          </Stack>
          <Divider />
          <DataTable
            uniqueRowId={(row) => Number(row.invoiceItemId)}
            onSelectOne={handleSelectOne}
            selectable
            columns={columns}
            rows={computedData}
          />
        </CardContent>
      </Card>
      <InvoiceItemPaymentDialog
        accounts={accounts}
        selectedRows={selectedRows}
        handleClose={togglePaymentDialog}
        open={isPaymentDialogOpen}
      />
    </>
  );
}

export default InvoiceItemTable;
