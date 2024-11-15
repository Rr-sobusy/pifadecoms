'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { generatedSeries } from '@/lib/format-generated-series';
import type { ExpenseType } from '@/actions/expenses/types';
import { type PaymentsType } from '@/actions/invoice-payments/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type ExpenseTableProps = {
  rows: ExpenseType;
};

const columns = [
  {
    formatter: (row) => <Typography>{dayjs(row.entryDate).format('MM DD YYYY')}</Typography>,
    name: 'Expense Date',
  },
  {
    formatter: (row) => <Typography>{row.JournalItems[0].Accounts.accountName}</Typography>,
    name: 'Expense/Purchase Acct.',
  },
  {
    formatter: (row) => <Typography>{row.referenceName}</Typography>,
    name: 'Reference No.',
  },
  {
    formatter: (row) => <Typography>{row.JournalItems[1].Accounts.accountName}</Typography>,
    name: 'Paid Through',
  },
  {
    formatter: (row) => {
      const amountPosted = row.JournalItems.reduce((acc, ctx) => acc + ctx.debit, 0);
      return <Typography>{formatToCurrency(amountPosted, 'Fil-ph', 'Php')}</Typography>;
    },
    name: 'Amount posted',
  },
] satisfies ColumnDef<ExpenseType[0]>[];

function ExpenseTable({ rows }: ExpenseTableProps) {
  return (
    <Card>
      <CardContent>
        <DataTable<ExpenseType[0]> columns={columns} rows={rows} />
      </CardContent>
    </Card>
  );
}

export default ExpenseTable;
