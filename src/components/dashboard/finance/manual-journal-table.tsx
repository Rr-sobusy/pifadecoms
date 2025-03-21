'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { JournalType } from '@/actions/journals/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

interface ManualJournalTableProps {
  journal: JournalType;
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
      return <Stack>{row.journalType}</Stack>;
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
  return (
    <Card>
      <DataTable columns={columns} rows={journal} />
    </Card>
  );
}

export default ManualJournalTable;
