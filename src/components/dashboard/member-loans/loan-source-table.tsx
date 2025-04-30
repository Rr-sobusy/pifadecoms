'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { formatToCurrency } from '@/lib/format-currency';
import type { ILoanSources } from '@/actions/loans/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

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
    name: 'Total Unpaid Loans from beginning to current (Total disburse minus total repayments posted)',
    formatter(row) {
      return formatToCurrency(row.totalReceivableAmt);
    },
  },
] satisfies ColumnDef<ILoanSources[0]>[];

function LoanSourceTable({ loanSources }: Props) {
  return (
    <Card>
      {loanSources.length > 1 ? (
        <DataTable columns={columns} rows={loanSources} />
      ) : (
        <Box sx={{ minHeight: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontSize={18}>
            No loan source/s found.
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default LoanSourceTable;
