'use client';

import React from 'react';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Decimal from 'decimal.js';

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

  const totals = rows.reduce(
    (acc, curr) => {
      const debit = new Decimal(String(curr._sum.debit ?? 0));
      const credit = new Decimal(String(curr._sum.credit ?? 0));

      const value = ['Assets', 'Expense'].includes(curr.account?.RootID.rootType ?? '')
        ? debit.minus(credit)
        : credit.minus(debit);

      const type = curr.account?.RootID.rootType;
      if (type && totals.hasOwnProperty(type)) {
        acc[type as keyof typeof totals] = (acc[type as keyof typeof totals] || new Decimal(0)).plus(value);
      } else {
        console.error(`Unexpected account type: ${type}`);
      }
      return acc;
    },
    {
      Assets: new Decimal(0),
      Equity: new Decimal(0),
      Liability: new Decimal(0),
      Expense: new Decimal(0),
      Revenue: new Decimal(0),
    }
  );

  const assets = totals.Assets;
  const liabilityPlusEquityPlusNetIncome = totals.Liability.plus(totals.Equity).plus(totals.Revenue.minus(totals.Expense));

  const tolerance = new Decimal(0.01);
  const difference = assets.minus(liabilityPlusEquityPlusNetIncome).abs();
  const isNotBalanced = difference.greaterThan(tolerance);

  const displayTotals = Object.fromEntries(
    Object.entries(totals).map(([key, value]) => [key, value.toFixed(2)])
  );

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
        <Typography variant="caption">{`Assets (${formatToCurrency(Number(displayTotals.Assets), 'Fil-ph', 'Php')}) = Liability (${formatToCurrency(Number(displayTotals.Liability), 'Fil-ph', 'Php')}) + Equity (${formatToCurrency(Number(displayTotals.Equity), 'Fil-ph', 'Php')}) + Net Income/Undivided Net Surplus (${formatToCurrency(Number(displayTotals.Revenue) - Number(displayTotals.Expense), 'Fil-ph', 'Php')})`}</Typography>
        {isNotBalanced && (
          <Typography variant="caption" color="error">
            Warning: The accounting equation is not balanced. Please check for possible errors in entry.
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default GeneralLedgerTable;
