'use client';

import * as React from 'react';

import { formatToCurrency } from '@/lib/format-currency';
import type { InvoiceItemsWithItem } from '@/actions/invoices/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => row.Item.itemName,
    name: 'Item Name',
    width: '250px',
  },
  {
    formatter: (row) => formatToCurrency(row.principalPrice, 'Fil-ph', 'Php'),
    name: 'Unit Price',
    width: '100px',
  },
  {
    formatter: (row) => formatToCurrency(row.trade, 'Fil-ph', 'Php'),
    name: 'Trade',
    width: '100px',
  },
  {
    formatter: (row) => row.quantity,
    name: 'Quantity',
    width: '100px',
  },
  {
    formatter: (row) => {
      const principalPaid = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.principalPaid), 0);
      return formatToCurrency(principalPaid, 'Fil-ph', 'Php');
    },
    name: 'Principal Paid',
    width: '100px',
  },
  {
    formatter: (row) => {
      const interestPaid = row.ItemPayment.reduce((acc, curr) => acc + Number(curr.interestPaid), 0);
      return formatToCurrency(interestPaid, 'Fil-ph', 'Php');
    },
    name: 'Interest Paid',
    width: '100px',
  },
  {
    formatter: (row) => {
      const amount = row.quantity * (row.trade + row.principalPrice);

      return formatToCurrency(amount, 'Fil-ph', 'Php');
    },
    name: 'Total Principal Amount',
    width: '100px',
  },
] satisfies ColumnDef<InvoiceItemsWithItem['InvoiceItems'][0]>[];

export interface LineItemsTableProps {
  data: InvoiceItemsWithItem['InvoiceItems'];
}

export function LineItemsTable({ data }: LineItemsTableProps): React.JSX.Element {
  return <DataTable columns={columns} rows={data} />;
}
