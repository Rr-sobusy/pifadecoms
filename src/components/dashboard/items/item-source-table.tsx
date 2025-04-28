'use client';

import * as React from 'react';
import Card from '@mui/material/Card';

import type { ItemSourcesType } from '@/actions/items/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { formatToCurrency } from '@/lib/format-currency';

interface PageProps {
  rows: ItemSourcesType;
}

const columns = [
  {
    name: 'Item source',
    formatter(row) {
      return row.itemSourceName;
    },
  },
  {
    name: 'Associated account',
    formatter(row) {
      return row.accountName;
    },
  },
  {
    name: 'Total Unpaid from Invoice (From beginning to current)',
    formatter(row) {
      return formatToCurrency(row.totalUnpaidAmt);
    },
    width : '500px'
  },
] satisfies ColumnDef<ItemSourcesType[0]>[];

function ItemSourceTable({ rows }: PageProps) {
  return (
    <Card>
      <DataTable rows={rows} columns={columns} />
    </Card>
  );
}

export default ItemSourceTable;
