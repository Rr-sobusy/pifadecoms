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
  // const totalDebit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.debit), 0);
  // const totalCredit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.credit), 0);

  // const totals = rows.reduce(
  //   (acc, curr) => {
  //     const type = curr.account?.RootID.rootType as keyof typeof acc;
  //     const debit = new Decimal(curr._sum.debit ?? 0);
  //     const credit = new Decimal(curr._sum.credit ?? 0);
  //     const value = ['Assets', 'Expense'].includes(type ?? '')
  //       ? debit.minus(credit) // Debit-based accounts
  //       : credit.minus(debit); // Credit-based accounts
  
  //     acc[type] = (acc[type] || new Decimal(0)).plus(value);
  //     return acc;
  //   },
  //   {
  //     Assets: new Decimal(0),
  //     Equity: new Decimal(0),
  //     Liability: new Decimal(0),
  //     Expense: new Decimal(0),
  //     Revenue: new Decimal(0),
  //   }
  // );
  
  // // Ensure precise comparison without floating-point errors
  // const isNotBalanced = !totals.Assets.equals(
  //   totals.Liability.plus(totals.Equity).plus(totals.Revenue.minus(totals.Expense))
  // );
  
  // // Convert for display, but keep calculations in `Decimal`
  // const displayTotals = Object.fromEntries(
  //   Object.entries(totals).map(([key, value]) => [key, value.toFixed(2)])
  // );
  const totalDebit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.debit), 0);
  const totalCredit = rows.reduce((acc, ctx) => acc + Number(ctx._sum.credit), 0);

  const totals = rows.reduce(
    (acc, curr) => {
      const type = curr.account?.RootID.rootType as keyof typeof acc;
      const debit = new Decimal(Number(curr._sum.debit ?? 0));
      const credit = new Decimal(Number(curr._sum.credit ?? 0));
      const value = ['Assets', 'Expense'].includes(type ?? '')
        ? debit.minus(credit) // Debit-based accounts
        : credit.minus(debit); // Credit-based accounts

      acc[type] = (acc[type] || new Decimal(0)).plus(value);
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

  // Round values for comparison
  const roundedAssets = totals.Assets.toDecimalPlaces(2);
  const roundedLiabilityPlusEquityPlusNetIncome = totals.Liability.plus(totals.Equity).plus(totals.Revenue.minus(totals.Expense)).toDecimalPlaces(2);

  // Ensure precise comparison without floating-point errors
  const isNotBalanced = !roundedAssets.equals(roundedLiabilityPlusEquityPlusNetIncome);

  // Convert for display, but keep calculations in `Decimal`
  const displayTotals = {
    Assets: totals.Assets.toFixed(2),
    Equity: totals.Equity.toFixed(2),
    Liability: totals.Liability.toFixed(2),
    Expense: totals.Expense.toFixed(2),
    Revenue: totals.Revenue.toFixed(2),
  };

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
