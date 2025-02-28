'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { ReferenceType } from '@prisma/client';

import { JournalMap } from '@/lib/api-utils/journal-map';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccountTransactionTypes } from '@/actions/reports/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

interface TransactionsTableProps {
  accountTransactions: AccountTransactionTypes;
}

const transactionTypeMap: Record<ReferenceType, string> = {
  LoanDisbursements: 'Loan Release',
  LoanRepayments: 'Loan Repayment',
  ManualJournals: 'Manual Journal',
  MemberRegistration: 'Member Registration',
  SalesPayments: 'Sales Payment',
  SavingsDeposit: 'Savings Deposit',
  SavingsWithdrawal: 'Savings Withdrawal',
  ShareDeposit: 'Share Deposit',
  ShareWithdrawal: 'Share Withdrawal',
};

const columns = [
  {
    formatter(row) {
      return (
        <Stack>
          <Typography variant="caption">{row.entryId.toString()}</Typography>
        </Stack>
      );
    },
    name: 'No.',
    width: '40px',
  },
  {
    formatter(row) {
      return (
        <Stack>
          <Typography variant="caption">{dayjs(row.entryDate).format('MMM DD YYYY')}</Typography>
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
          <Typography variant="caption">{transactionTypeMap[row.referenceType]}</Typography>
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
            {Object.keys(JournalMap).find((key) => JournalMap[key] === row.journalType)}
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
          <Typography variant="caption">{row.notes}</Typography>
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
            {row.Members === null ? ' ' : `${row.Members?.lastName} ${row.Members.firstName}`}
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
          <Typography variant="caption">{row.referenceName}</Typography>
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
          {row.JournalItems.map((ctx) => (
            <Typography
              key={ctx.journalItemsId}
              sx={{
                marginLeft: Number(ctx.debit) === 0 ? 3 : 0,
              }}
              variant="caption"
            >
              {ctx.Accounts.accountName}
            </Typography>
          ))}
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
          {row.JournalItems.map((ctx, index) => (
            <Typography color="info" variant="subtitle2">
              {Number(ctx.debit) !== 0 ? formatToCurrency(Number(row.JournalItems[index].debit), 'Fil-ph', 'Php') : '-'}
            </Typography>
          ))}
        </Stack>
      );
    },
    name: 'Debit (Php)',
    width: '100px',
    align: 'right',
  },
  {
    formatter(row) {
      return (
        <Stack>
          {row.JournalItems.map((ctx, index) => (
            <Typography color="info" variant="subtitle2">
              {Number(ctx.credit) !== 0
                ? formatToCurrency(Number(row.JournalItems[index].credit), 'Fil-ph', 'Php')
                : '-'}
            </Typography>
          ))}
        </Stack>
      );
    },
    name: 'Credit (Php)',
    width: '100px',
    align: 'right',
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
      <DataTable onClick={(_, row) => console.log(row)} hover columns={columns} rows={paginatedTransactions} />
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
