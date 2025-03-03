'use client';

import React from 'react';
import { CardContent, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { InvoiceItemPerMemberTypes } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import InvoiceItemPaymentDialog from './_invoice-item-payment-dialog';
import { AccounTreeType } from '@/actions/accounts/types';

type PageProps = {
  data: InvoiceItemPerMemberTypes;
  accounts: AccounTreeType
};

const columns = [
  {
    name: 'Invoice Id',
    formatter: (row) => {
      return <Typography variant="subtitle2">{row.invoiceId.toString()}</Typography>;
    },
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
      return <Typography variant="subtitle2">{row.quantity.toString()}</Typography>;
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
      return <Typography variant="subtitle2">{formatToCurrency(totalAmountPayable, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Principal Paid',
    formatter: (row, index) => {
      const totalPaid = row.ItemPayment.map((items) => {
        const totalPrincipal = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.principalPaid), 0);
        return { totalPrincipal };
      });
      return (
        <Typography color="error">
          {formatToCurrency(totalPaid[index]?.totalPrincipal || 0, 'Fil-ph', 'Php')}
        </Typography>
      );
    },
  },
  {
    name: 'Interest Paid',
    formatter: (row, index) => {
      const totalPaid = row.ItemPayment.map((items) => {
        const totalInterest = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.interestPaid), 0);

        return { totalInterest };
      });
      return (
        <Typography color="error">{formatToCurrency(totalPaid[index]?.totalInterest || 0, 'Fil-ph', 'Php')}</Typography>
      );
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

function InvoiceItemTable({ data , accounts}: PageProps) {
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
 
  const memberId = data?.[0]?.Invoice.Members.memberId || "";
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
        memberId={memberId}
      />
    </>
  );
}

export default InvoiceItemTable;
