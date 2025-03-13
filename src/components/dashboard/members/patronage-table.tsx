'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { formatToCurrency } from '@/lib/format-currency';
import type { MemberPatronageType } from '@/actions/reports/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import { MemberPatronagesTab } from './member-patronage-tab';

type Props = { content: { month: string; value: number }[]; rows: MemberPatronageType };

const columns = [
  {
    name: 'Account',
    formatter: (row) => {
      return <Typography variant="subtitle2">{row.account?.accountName}</Typography>;
    },
  },
  {
    name: 'Patronage Amount',
    formatter: (row) => {
      return (
        <Typography variant="subtitle2">
          {formatToCurrency(Math.abs(Number(row._sum.debit) - Number(row._sum.credit)), 'Fil-ph', 'Php')}
        </Typography>
      );
    },
  },
] satisfies ColumnDef<MemberPatronageType[0]>[];

function PatronageTable({ content, rows }: Props) {
  console.log(rows);
  return (
    <MemberPatronagesTab content={content}>
      {rows.length ? (
        <DataTable hover columns={columns} rows={rows} />
      ) : (
        <Box
          sx={{
            minHeight: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle2">No patronages data found!</Typography>
        </Box>
      )}
    </MemberPatronagesTab>
  );
}

export default PatronageTable;
