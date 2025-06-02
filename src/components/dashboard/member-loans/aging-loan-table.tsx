'use client';

import React from 'react';
import Card from '@mui/material/Card';

import { ColumnDef, DataTable } from '@/components/core/data-table';

type Props = {};

const columns = [
  {
    name: 'Loaner Name',
  },
] satisfies ColumnDef<{}>[];

function AgingLoanTable({}: Props) {
  return (
    <Card>
      <DataTable rows={[]} columns={columns} />
    </Card>
  );
}

export default AgingLoanTable;
