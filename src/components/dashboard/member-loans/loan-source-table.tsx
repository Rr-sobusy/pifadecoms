'use client';

import React from 'react';
import Card from '@mui/material/Card';

import type { ILoanSources } from '@/actions/loans/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';
import { formatToCurrency } from '@/lib/format-currency';

interface Props {
  loanSources: ILoanSources;
}

const columns = [
  {
    name: 'Loan Source',
    formatter(row) {
      return row.loanSourceName;
    },
  },
  {
    name: 'Associated Account',
    formatter(row) {
      return row.accountName;
    },
  },
  {
    name: 'Total Unpaid Loans (From beginning to current)',
    formatter(row) {
      return formatToCurrency(row.totalReceivableAmt);
    },
  },
] satisfies ColumnDef<ILoanSources[0]>[];

function LoanSourceTable({ loanSources }: Props) {
  return (
    <Card>
      <DataTable columns={columns} rows={loanSources} />
    </Card>
  );
}

export default LoanSourceTable;
