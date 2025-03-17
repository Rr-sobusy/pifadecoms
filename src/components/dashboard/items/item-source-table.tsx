"use client"


import * as React from 'react';
import type { Metadata } from 'next';
import Card from '@mui/material/Card';


import type { ItemSourcesType } from '@/actions/items/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type PageProps = {
  rows: ItemSourcesType;
};

const columns = [
  {
    name: 'Item source',
    formatter(row) {
      return row.sourceName;
    },
  },
  {
    name: 'Associated account',
    formatter(row) {
      return row.Accounts.accountName;
    },
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
