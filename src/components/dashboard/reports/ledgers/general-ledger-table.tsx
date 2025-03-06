'use client';

import React from 'react';
import { Divider } from '@mui/material';
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
      <Typography variant="subtitle2">{formatToCurrency(Number(row._sum.debit ?? 0), 'Fil-ph', 'Php')}</Typography>
    ),
    name: 'Debit (Php)',
  },
  {
    formatter: (row) => (
      <Typography variant="subtitle2">{formatToCurrency(Number(row._sum.credit ?? 0), 'Fil-ph', 'Php')}</Typography>
    ),
    name: 'Credit (Php)',
  },
  {
    formatter: (row) => {
      const balance = ['Assets', 'Expense'].includes(row.account?.RootID.rootType ?? '')
        ? (Number(row._sum.debit) ?? 0) - (Number(row._sum.credit) ?? 0)
        : (Number(row._sum.credit) ?? 0) - (Number(row._sum.debit) ?? 0);
      return <Typography variant="subtitle2">{formatToCurrency(balance, 'Fil-ph', 'Php')}</Typography>;
    },
    name: 'Ending Balance',
    width: '150px',
  },
] satisfies ColumnDef<LedgerTypes[0]>[];

function GeneralLedgerTable({ rows }: GeneralLedgerTableProps) {
  const totalDebit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.debit), 0);
  const totalCredit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.credit), 0);
  const fixedDecimal = (num: number): number => Number(num.toFixed(2))
  const totals = rows.reduce(
    (acc, curr) => {
      const type = curr.account?.RootID.rootType;
      const value = ['Assets', 'Expense'].includes(type ?? '')
        ? (fixedDecimal(Number(curr._sum.debit)) || 0) - (fixedDecimal(Number(curr._sum.credit)) || 0)
        : (fixedDecimal(Number(curr._sum.credit)) || 0) - (fixedDecimal(Number(curr._sum.debit)) || 0)

      if (type === 'Assets') {
        acc.Assets += value;
      }
      if (type === 'Equity') {
        acc.Equity += value;
      }
      if (type === 'Liability') {
        acc.Liability += value;
      }
      if (type === 'Expense') {
        acc.Expense += value;
      }
      if (type === 'Revenue') {
        acc.Revenue += value;
      }

      return acc;
    },
    { Assets: 0, Equity: 0, Liability: 0, Expense: 0, Revenue: 0 }
  );

  console.log(totals)
  console.log(rows)

  const isNotBalanced = totals.Equity + totals.Liability + (totals.Revenue - totals.Expense) !== totals.Assets;
  const value = totals.Equity + totals.Liability + (totals.Revenue - totals.Expense)
  return (
    <>
      {rows.length ? (
        <DataTable<LedgerTypes[0]> hover columns={columns} rows={rows} />
      ) : (
        <Stack minHeight={100} justifyContent="center" alignItems="center">
          <Typography>No data found!</Typography>
        </Stack>
      )}
      <Stack marginTop={2} alignItems={'flex-end'}>
        <Typography variant="caption">Total Debit - {formatToCurrency(totalDebit, 'Fil-ph', 'Php')}</Typography>
        <Typography variant="caption">Total Credit - {formatToCurrency(totalCredit, 'Fil-ph', 'Php')} </Typography>
      </Stack>
      <Divider sx={{ marginY: 2 }} />
      <Stack>
        <Typography variant="subtitle2">Accounting Equation:</Typography>
        <Typography variant="caption">{`Assets (${formatToCurrency(totals.Assets, 'Fil-ph', 'Php')}) = Liability (${formatToCurrency(totals.Liability, 'Fil-ph', 'Php')}) + Equity (${formatToCurrency(totals.Equity, 'Fil-ph', 'Php')}) + Net Income/Undivided Net Surplus (${formatToCurrency(totals.Revenue - totals.Expense, 'Fil-ph', 'Php')})`}</Typography>
        {isNotBalanced && (
          <Typography variant="caption" color="error">
            Warning: The accounting equation is not balanced. Please check for possible errors in entry. {value} {totals.Assets}
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default GeneralLedgerTable;
