'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { type InvoiceType } from '@/actions/invoices/types';
import type { AccountTransactionTypes, LedgerTypes } from '@/actions/reports/types';
import { usePopover } from '@/hooks/use-popover';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type TransactionsTableProps = {
  accountTransactions: AccountTransactionTypes;
};

const columns = [
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{dayjs(row.JournalEntries.entryDate).format('MMM DD YYYY')}</Typography>
        </Stack>
      );
    },
    name: 'Posting Date',
    width: '130px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.Accounts.accountName}</Typography>
        </Stack>
      );
    },
    name: 'Account',
    width: '200px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.JournalEntries.referenceType}</Typography>
        </Stack>
      );
    },
    name: 'Transaction Type',
    width: '140px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.JournalEntries.journalType}</Typography>
        </Stack>
      );
    },
    name: 'Journal',
    width: '140px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.JournalEntries.notes}</Typography>
        </Stack>
      );
    },
    name: 'Notes',
    width: '150px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.JournalEntries.particulars}</Typography>
        </Stack>
      );
    },
    name: 'Particular',
    width: '200px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="caption">{row.JournalEntries.referenceName}</Typography>
        </Stack>
      );
    },
    name: 'Reference #',
    width: '120px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="subtitle2">
            {row.debit !== 0 ? formatToCurrency(row.debit, 'Fil-ph', 'Php') : ''}
          </Typography>
        </Stack>
      );
    },
    name: 'Debit',
    width: '100px',
  },
  {
    formatter(row, index) {
      return (
        <Stack>
          <Typography variant="subtitle2">
            {row.credit !== 0 ? formatToCurrency(row.credit, 'Fil-ph', 'Php') : ''}
          </Typography>
        </Stack>
      );
    },
    name: 'Credit',
    width: '100px',
  },
  {
    formatter(row, index) {
      return (
        <Typography variant="subtitle2">
          {row.credit !== 0
            ? formatToCurrency(row.credit, 'Fil-ph', 'Php')
            : formatToCurrency(row.debit, 'Fil-ph', 'Php')}
        </Typography>
      );
    },
    name: 'Amount',
    width: '100px',
  },
] satisfies ColumnDef<AccountTransactionTypes[0]>[];

function TransactionsTable({ accountTransactions }: TransactionsTableProps) {
  return (
    <>
      <DataTable hover columns={columns} rows={accountTransactions} />
      {!accountTransactions.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="overline">
            No members found
          </Typography>
        </Box>
      ) : null}
    </>
  );
}

export default TransactionsTable;
