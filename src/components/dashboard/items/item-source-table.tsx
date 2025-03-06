"use client"


import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

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
    formatter(row, index) {
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
