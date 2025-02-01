'use client';

import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatToCurrency } from '@/lib/format-currency';
import type { LedgerTypes } from '@/actions/reports/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

interface GeneralLedgerTableProps {
  rows: LedgerTypes;
}

const columns = [
  {
    formatter: (row) => <Typography variant="caption">{row.account?.accountName}</Typography>,
    name: 'Account Name',
  },
  {
    formatter: (row) => (
      <Typography variant="subtitle2">{formatToCurrency(row._sum.debit ?? 0, 'Fil-ph', 'Php')}</Typography>
    ),
    name: 'Debit',
  },
  {
    formatter: (row) => (
      <Typography variant="subtitle2">{formatToCurrency(row._sum.credit ?? 0, 'Fil-ph', 'Php')}</Typography>
    ),
    name: 'Credit',
  },
  {
    formatter: (row) => {
      const balance = ['Assets', 'Expenses'].includes(row.account?.RootID.rootType ?? '')
        ? (row._sum.debit ?? 0) - (row._sum.credit ?? 0)
        : (row._sum.credit ?? 0) - (row._sum.debit ?? 0);
      return <Typography variant="subtitle2">{formatToCurrency(balance, 'Fil-ph', 'Php')}</Typography>;
    },
    name: 'Balance',
    width: '150px',
  },
] satisfies ColumnDef<LedgerTypes[0]>[];

function GeneralLedgerTable({ rows }: GeneralLedgerTableProps) {
  const totalDebit = rows.reduce((acc, ctx) => acc + (ctx._sum.debit ?? 0), 0);
  const totalCredit = rows.reduce((acc, ctx) => acc + (ctx._sum.credit ?? 0), 0);
  console.log(rows);
  return (
    <>
      <DataTable<LedgerTypes[0]> hover columns={columns} rows={rows} />
      <Stack marginTop={2} alignItems={'flex-end'}>
        <Typography variant="caption">Total Debit - {formatToCurrency(totalDebit, 'Fil-ph', 'Php')}</Typography>
        <Typography variant="caption">Total Credit - {formatToCurrency(totalCredit, 'Fil-ph', 'Php')} </Typography>
      </Stack>
    </>
  );
}

export default GeneralLedgerTable;
