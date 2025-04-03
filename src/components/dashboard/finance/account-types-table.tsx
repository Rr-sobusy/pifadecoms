'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import type { AccounTreeType } from '@/actions/accounts/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Props {
  accounts: AccounTreeType;
};

const columns = [
  {
    name: 'ID',
    formatter: (_, index) => (
      <Typography color="text.secondary" variant="body2">
        {index + 1}
      </Typography>
    ),
  },
  {
    name: 'Account Type',
    formatter: (row) => (
      <Typography color="text.primary" variant="body2">
        {row.rootName}
      </Typography>
    ),
  },
  {
    name: 'Root Type',
    formatter: (row) => <Typography variant="body2">{row.rootType}</Typography>,
  },
  {
    name: 'Created At',
    formatter: (row) => <Typography variant="body2">{dayjs(row.createdAt).format('MMM DD YYYY')}</Typography>,
  },
] satisfies ColumnDef<AccounTreeType[0]>[];

function AccountTypesTable({ accounts }: Props) {
  console.log(accounts);
  return (
    <>
      <DataTable<AccounTreeType[0]> columns={columns} rows={accounts} />
      {!accounts.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No chart of accounts listed
          </Typography>
        </Box>
      ) : null}
    </>
  );
}

export default AccountTypesTable;
