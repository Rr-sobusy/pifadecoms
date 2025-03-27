'use client';

import React from 'react';
import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { JournalType as JourType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { JournalType } from '@/actions/journals/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

interface ManualJournalTableProps {
  journal: JournalType;
}

const journalMap: Record<JourType, string> = {
  cashDisbursement: 'Cash Disbursement',
  cashReceipts: 'Cash Receipts',
  generalJournal: 'General Journal',
};

const columns = [
  {
    formatter(row) {
      return <Stack>{dayjs(row.entryDate).format('MMM DD YYYY')}</Stack>;
    },
    name: 'Date Posted',
    width: '70px',
  },
  {
    formatter(row) {
      return <Stack>{row.referenceName}</Stack>;
    },
    name: 'Reference #',
    width: '80px',
  },
  {
    formatter(row) {
      return <Stack>{journalMap[row.journalType]}</Stack>;
    },
    name: 'Journal Type',
    width: '100px',
  },
  {
    formatter(row) {
      return <Stack>{row.notes}</Stack>;
    },
    name: 'Notes',
    width: '250px',
  },
  {
    formatter(row) {
      return <Stack>{row.Members ? `${row.Members.lastName}, ${row.Members.firstName}` : 'N/A'}</Stack>;
    },
    name: 'Particulars',
    width: '100px',
  },
  {
    formatter(row) {
      const totalAmountPosted = row.JournalItems.reduce((acc, ctx) => acc + Number(ctx.debit), 0);
      return <Stack>{formatToCurrency(totalAmountPosted, 'Fil-ph', 'Php')}</Stack>;
    },
    name: 'Amount Posted',
    width: '100px',
  },
] satisfies ColumnDef<JournalType[0]>[];

function ManualJournalTable({ journal }: ManualJournalTableProps) {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(100);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  function handlePageChange(_: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <Card>
        {journal.length > 0 ? (
          <Stack>
            <DataTable columns={columns} rows={journal} />
            <Paginator
              rowsPerPage={rowsPerPage}
              count={journal.length}
              onPageChange={handlePageChange}
              page={currentPage}
              onRowsPerPageChange={(event) => {
                const currRow = event.target.value;
                if (currRow) return setRowsPerPage(Number(currRow));
              }}
            />
          </Stack>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="overline">
              No transactions found
            </Typography>
          </Box>
        )}
      </Card>
    </>
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
      rowsPerPageOptions={[100, 200]}
      rowsPerPage={rowsPerPage}
      count={count}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
    />
  );
}

export default ManualJournalTable;
