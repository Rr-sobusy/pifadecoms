'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { paths } from '@/paths';
import { formatToCurrency } from '@/lib/format-currency';
import { AccountType } from '@/actions/accounts/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

const columns = [
  {
    formatter: (_, index): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {index + 1}
          </Typography>
        </div>
      </Stack>
    ),
    name: '',
    width: '10px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.accountName}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Account Name',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.RootID.rootType}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Root Type',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.RootID.rootName}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Type',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {formatToCurrency(Number(row.openingBalance), 'Fil-ph', 'Php')}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Opening balance',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        active: { icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />, title: 'active' },
        inactive: { icon: <MinusIcon color="var(--mui-palette-error-main)" />, title: 'active' },
      };

      const { title, icon } = row.isActive ? mapping['active'] : mapping['inactive'];
      return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip size="small" variant="outlined" icon={icon} label={title} />
        </Stack>
      );
    },
    name: 'Status',
    width: '100px',
  },
] satisfies ColumnDef<AccountType[0]>[];
export interface MembersTableProps {
  rows: AccountType;
}

export function AccountsTable({ rows }: MembersTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable<AccountType[0]> columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No chart of accounts listed
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
