'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr/Notepad';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { MemberFundsType } from '@/actions/funds/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface MemberFundsTableProps {
  rows?: MemberFundsType;
}

const columns = [
  {
    formatter: (row) => <div>{`${row.Member.lastName}, ${row.Member.firstName}`}</div>,
    name: 'Member Name',
    width: '250px',
  },
  {
    formatter: (row) => <div>{dayjs(row.createdAt).format('MMM DD YYYY')}</div>,
    name: 'Date Created',
    width: '100px',
  },
  {
    formatter: (row) => <div>{formatToCurrency(row.savingsBal, 'Fil-ph', 'Php')}</div>,
    name: 'Member Savings',
    width: '150px',
  },
  {
    formatter: (row) => <div>{formatToCurrency(row.shareCapBal, 'Fil-ph', 'Php')}</div>,
    name: 'Share Capital (CBU)',
    width: '150px',
  },

  {
    formatter: (row) => <div>{dayjs(row.updatedAt).format('MMM DD YYYY')}</div>,
    name: 'Last Transaction',
    width: '100px',
  },
  {
    formatter: (row) => (
      <IconButton LinkComponent={RouterLink} href={paths.dashboard.funds.view(row.fundId)}>
        <Info />
      </IconButton>
    ),
    name: 'Action',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<MemberFundsType[0]>[];

export function MemberFundsTable({ rows = [] }: MemberFundsTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" variant="body2">
            No fund savings record found.
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
