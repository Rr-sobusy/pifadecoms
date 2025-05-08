'use client';

import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import type { DoubleEntryType } from '@/actions/reports/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

interface DoubleEntryTranscationsTableProps {
  entries: DoubleEntryType;
}

const columns = [
  {
    name: 'First Entry',
    formatter: (row) => {
      return <Typography>{row.first}</Typography>;
    },
  },
  {
    name: 'Second Entry',
    formatter: (row) => {
      return <Typography>{row.second}</Typography>;
    },
  },
] satisfies ColumnDef<DoubleEntryType[0]>[];

function DoubleEntryTranscationsTable({ entries }: DoubleEntryTranscationsTableProps) {
  return (
    <Card>
      {entries.length ? (
        <DataTable size='small' columns={columns} rows={entries} />
      ) : (
        <Stack justifyContent="center" alignItems="center" minHeight={150}>
          <Typography variant="subtitle2" fontSize={14}>No potential multiple postings detected.</Typography>
        </Stack>
      )}
    </Card>
  );
}

export default DoubleEntryTranscationsTable;
