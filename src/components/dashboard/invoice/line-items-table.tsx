'use client';

import * as React from 'react';

import { formatToCurrency } from '@/lib/format-currency';
import type { InvoiceItemsWithItem, SingleInvoiceType } from '@/actions/invoices/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row, index) => row.Item.itemName,
    name: 'Item Name',
    width: '250px',
  },
  {
    formatter: (row) => formatToCurrency(row.rate, 'Fil-ph', 'Php'),
    name: 'Unit Price',
    width: '200px',
  },
  {
    formatter: (row) => row.quantity,
    name: 'Quantity',
    width: '100px',
  },
  {
    formatter: (row) => formatToCurrency(row.quantity * row.rate, 'Fil-ph', 'Php'),
    name: 'Amount',
    width: '200px',
    align: 'right',
  },
] satisfies ColumnDef<InvoiceItemsWithItem['InvoiceItems'][0]>[];

export interface LineItemsTableProps {
  data: InvoiceItemsWithItem['InvoiceItems'];
}

export function LineItemsTable({ data }: LineItemsTableProps): React.JSX.Element {
  return <DataTable columns={columns} rows={data} />;
}
