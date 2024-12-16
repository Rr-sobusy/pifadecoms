'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';

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
      const mapping = {
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        reconciled: {
          label: 'Reconciled',
          icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
        },
      } as const;

      function getMapping() {
        if (row.JournalEntries.status === 'Pending') return mapping['pending'];
        return mapping['reconciled'];
      }

      const { icon, label } = getMapping();
      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Reconcilation Status',
    width: '120px',
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
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  function handlePageChange(_: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const paginatedTransactions = accountTransactions.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <React.Fragment>
      <DataTable onClick={(_, row)=>console.log(row)} hover columns={columns} rows={paginatedTransactions} />
      {!accountTransactions.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="overline">
            No transactions found
          </Typography>
        </Box>
      ) : null}
      <Divider />
      <Paginator
        rowsPerPage={rowsPerPage}
        count={accountTransactions.length}
        onPageChange={handlePageChange}
        page={currentPage}
        onRowsPerPageChange={(event) => {
          const currRow = event.target.value;
          if (currRow) return setRowsPerPage(Number(currRow));
        }}
      />
    </React.Fragment>
  );
}

function Paginator({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}) {
  return (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={[10, 25, 50, 100]}
      rowsPerPage={rowsPerPage}
      count={count}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
    />
  );
}

export default TransactionsTable;
