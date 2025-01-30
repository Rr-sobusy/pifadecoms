'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { ILoanType } from '@/actions/loans/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    name: 'Loan ID',
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {row.loanId.toString()}
      </Typography>
    ),
  },
  {
    name: 'Loaner Name',
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {row.Member.lastName + ', ' + row.Member.firstName}
      </Typography>
    ),
  },
  {
    name: 'Loan Type',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {row.loanType}
      </Typography>
    ),
  },
  {
    name: 'Date Released',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {dayjs(row.issueDate).format('MM-DD-YYYY')}
      </Typography>
    ),
  },
  {
    name: 'Loaned Amount',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {formatToCurrency(row.amountLoaned, 'Fil-ph', 'Php')}
      </Typography>
    ),
  },
  {
    name: 'Amount to pay',
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {formatToCurrency(row.amountPayable, 'Fil-ph', 'Php')}
      </Typography>
    ),
  },
  {
    name: 'Amortization Paid',
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {row.Repayments.reduce((acc, curr) => acc + curr.amountDue, 0)}
      </Typography>
    ),
  },
  {
    name: 'Interest Rate',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="body2" color="text.primary">
        {row.interestRate}
      </Typography>
    ),
  },
  
] as ColumnDef<ILoanType[0]>[];
export function LoanTable({ rows }: { rows: ILoanType }) {
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable columns={columns} rows={rows} />
    </Card>
  );
}
