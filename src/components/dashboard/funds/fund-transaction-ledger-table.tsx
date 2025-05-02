'use client';

import React from 'react';
import Card from '@mui/material/Card';
import type { FundTransactionsType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { MemberFundTransactionLedgerType } from '@/actions/funds/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

const fundTransactionMap: Record<FundTransactionsType, string> = {
  SavingsDeposit: 'Savings deposit',
  SavingsWithdrawal: 'Savings withdrawal',
  ShareCapDeposit: 'Share Capital deposit',
  ShareCapWithdrawal: 'Share Capital withdrawal',
};

interface FundTransactionsLedgerTableProps {
  rows: MemberFundTransactionLedgerType;
}

const columns = [
  {
    name: 'Posting Date',
    formatter(row) {
      return dayjs(row.JournalEntries?.entryDate).format('MMM DD YYYY');
    },
    width: '200',
  },
  {
    name: 'Transaction Type',
    formatter(row) {
      return fundTransactionMap[row.transactionType];
    },
    width: '200',
  },
  {
    name: 'Member Name',
    formatter(row) {
      return `${row.MemberFunds.Member.lastName}, ${row.MemberFunds.Member.firstName} ${row.MemberFunds.Member.middleName ?? ''}`;
    },
    width: '300px',
  },
  {
    name: 'Posting Balance',
    formatter(row) {
      return formatToCurrency(Number(row.postedBalance));
    },
    width: '100px',
  },
  {
    name: 'Reference',
    formatter(row) {
      return row.JournalEntries?.referenceName;
    },
    width: '100',
    align: 'right',
  },
] satisfies ColumnDef<MemberFundTransactionLedgerType[0]>[];

function FundTransactionLedgerTable({ rows }: FundTransactionsLedgerTableProps) {
  return (
    <Card>
      <DataTable columns={columns} rows={rows} />
    </Card>
  );
}

export default FundTransactionLedgerTable;
