'use client';

import React from 'react';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { InvoiceItemPerMemberTypes } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type PageProps = {
  data: InvoiceItemPerMemberTypes;
};

const columns = [
  {
    name: 'Invoice Id',
    formatter: (row, index) => {
      return <Typography>{row.invoiceId.toString()}</Typography>;
    },
  },
  {
    name: 'Date of invoice',
    formatter: (row, index) => {
      return <Typography>{dayjs(row.Invoice?.dateOfInvoice).format('MMM DD YYYY')}</Typography>;
    },
  },
  {
    name: 'Item Source',
    formatter: (row, index) => {
      return <Typography>{row.Item.ItemSource.sourceName}</Typography>;
    },
  },
  {
    name: 'Item name',
    formatter: (row, index) => {
      return <Typography>{row.Item.itemName}</Typography>;
    },
  },
  {
    name: 'Qty. Purchased',
    formatter: (row, index) => {
      return <Typography>{row.quantity.toString()}</Typography>;
    },
  },
  {
    name: 'Item Amount',
    formatter: (row, index) => {
      return <Typography>{formatToCurrency(row.principalPrice, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Trade',
    formatter: (row, index) => {
      return <Typography>{formatToCurrency(row.trade, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Principal Paid',
    formatter: (row, index) => {
      const totalPaid = row.ItemPayment.map((items) => {
        const totalPrincipal = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.principalPaid), 0);
        return { totalPrincipal };
      });
      return <Typography>{formatToCurrency(totalPaid[index]?.totalPrincipal || 0, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Interest Paid',
    formatter: (row, index) => {
      const totalPaid = row.ItemPayment.map((items) => {
        const totalInterest = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.interestPaid), 0);

        return { totalInterest };
      });
      return <Typography>{formatToCurrency(totalPaid[index]?.totalInterest || 0, 'Fil-ph', 'Php')}</Typography>;
    },
  },
  {
    name: 'Payment O.R/s',
    formatter: (row) => {
      const paymentOr = row.ItemPayment.map((payments) => payments.JournalEntry.referenceName);

      return <Typography>{paymentOr.join(',')}</Typography>;
    },
  },
] satisfies ColumnDef<InvoiceItemPerMemberTypes[0]>[];

function InvoiceItemTable({ data }: PageProps) {
  console.log(data);
  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} rows={data} />
      </CardContent>
    </Card>
  );
}

export default InvoiceItemTable;
