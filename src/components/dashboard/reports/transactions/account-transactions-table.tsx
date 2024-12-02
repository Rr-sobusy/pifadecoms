'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import { JournalMap } from '@/lib/api-utils/journal-map';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccountTransactionTypes } from '@/actions/reports/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type TransactionsTableProps = {
  accountTransactions: AccountTransactionTypes;
};

const columns = [
  {
    formatter(row) {
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
    formatter(row) {
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
    formatter(row) {
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
    formatter(row) {
      return (
        <Stack>
          <Typography variant="caption">
            {Object.keys(JournalMap).find((key) => JournalMap[key] === row.JournalEntries.journalType)}
          </Typography>
        </Stack>
      );
    },
    name: 'Journal',
    width: '140px',
  },
  {
    formatter(row) {
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
    formatter(row) {
      return (
        <Stack>
          <Typography variant="caption">
            {row.JournalEntries.Members === null
              ? ' '
              : `${row.JournalEntries.Members?.lastName} ${row.JournalEntries.Members.firstName}`}
          </Typography>
        </Stack>
      );
    },
    name: 'Particular',
    width: '200px',
  },
  {
    formatter(row) {
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
    formatter(row) {
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
    formatter(row) {
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
    formatter(row) {
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
    <React.Fragment>
      <DataTable hover columns={columns} rows={accountTransactions} />
      {!accountTransactions.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="overline">
            No transactions found
          </Typography>
        </Box>
      ) : null}
      <Divider />
      <Paginator />
    </React.Fragment>
  );
}

function Paginator() {
  return <TablePagination    component="div" page={1} rowsPerPage={25} count={10} onPageChange={() => null} />;
}

export default TransactionsTable;
