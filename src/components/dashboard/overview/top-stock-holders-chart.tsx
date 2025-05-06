'use client';

import React from 'react';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from '@mui/system';

import { formatToCurrency } from '@/lib/format-currency';
import type { TopStockHoldersType } from '@/actions/overview/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

interface TopStockHoldersChartProps {
  rows: TopStockHoldersType;
}

const columns = [
  {
    name: 'Member Name',
    formatter(row) {
      return row.Member.lastName + ', ' + row.Member.firstName + ' ' + (row.Member.middleName ?? '');
    },
  },
  {
    name: 'Current share',
    formatter(row) {
      return formatToCurrency(row.shareCapBal);
    },
  },
  {
    name: 'Ownership',
    formatter(row) {
      return (
        <Stack direction="column">
          <LinearProgress variant="determinate" value={row.sharePercent} />
          <Typography variant="caption">{`${row.sharePercent.toFixed(2)}%`}</Typography>
        </Stack>
      );
    },
  },
] satisfies ColumnDef<TopStockHoldersType[0]>[];

function TopStockHoldersChart({ rows }: TopStockHoldersChartProps) {
  return <DataTable size="small" columns={columns} rows={rows} />;
}

export default TopStockHoldersChart;
