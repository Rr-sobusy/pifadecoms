'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { ItemTypes } from '@/actions/items/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <div>
          <Link
            color="text.primary"
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.itemName}
          </Link>
          <Typography color="text.secondary" variant="body2">
            in {row.itemType}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '300px',
  },
  {
    formatter: (row) => row.itemDescription,
    name: 'Item Description',
    width: '250px',
  },
  {
    formatter: (row) => formatToCurrency(row.sellingPrice, 'Fil-ph', 'Php'),
    name: 'Price',
    width: '100px',
  },
  {
    formatter: (row) => formatToCurrency(row.trade, 'Fil-ph', 'Php'),
    name: 'Trade',
    width: '100px',
  },
  {
    formatter: (row) => dayjs(row.updatedAt).format('MMM DD YYYY'),
    name: 'Last Updated',
    width: '100px',
  },
  {
    formatter: (row) => (
      <IconButton LinkComponent={RouterLink} href={`${paths.dashboard.items.list}?itemId=${row.itemID}`}>
        <Info />
      </IconButton>
    ),
    name: 'Action',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<ItemTypes[0]>[];

export interface ProductsTableProps {
  rows?: ItemTypes;
}

export function ItemsTable({ rows = [] }: ProductsTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable<ItemTypes[0]> columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No products found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
