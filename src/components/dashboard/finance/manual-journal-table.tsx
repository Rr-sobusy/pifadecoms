'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { JournalType } from '@/actions/journals/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

type ManualJournalTableProps = {
  journal: JournalType;
};

const columns = [
  {
    formatter(row, index) {
      return <Stack>{dayjs(row.entryDate).format('MMM DD YYYY')}</Stack>;
    },
    name: 'Date Posted',
    width: '70px',
  },
  {
    formatter(row, index) {
      return <Stack>{row.referenceName}</Stack>;
    },
    name: 'Reference #',
    width: '80px',
  },
  {
    formatter(row, index) {
      return <Stack>{row.journalType}</Stack>;
    },
    name: 'Journal Type',
    width: '100px',
  },
  {
    formatter(row, index) {
      return <Stack>{row.notes}</Stack>;
    },
    name: 'Notes?',
    width: '250px',
  },
  {
    formatter(row, index) {
      return <Stack>{row.Members ? `${row.Members.lastName}, ${row.Members.firstName}` : 'N/A'}</Stack>;
    },
    name: 'Particulars?',
    width: '100px',
  },
  {
    formatter(row, index) {
      const totalAmountPosted = row.JournalItems.reduce((acc, ctx) => acc + ctx.debit, 0);
      return <Stack>{formatToCurrency(totalAmountPosted, 'Fil-ph', 'Php')}</Stack>;
    },
    name: 'Amount Posted',
    width: '100px',
  },
] satisfies ColumnDef<JournalType[0]>[];

function ManualJournalTable({ journal }: ManualJournalTableProps) {
  return (
    <Card>
      <DataTable columns={columns} rows={journal} />
    </Card>
  );
}

export default ManualJournalTable;
