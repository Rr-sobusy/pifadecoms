'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';;
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr/Notepad';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { ILoanType } from '@/actions/loans/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    name: 'Loaner Title',
    formatter: (row): React.JSX.Element => {
      return (
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', display: 'inline-flex', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          <div>
            <Stack direction="row" alignItems={`center`} gap={2}>
              <Typography color="text.primary" variant="subtitle2">
                {`LOAN-${row.loanId.toString().padStart(5, '0')}`}
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="subtitle2">
              {row.Member.lastName + ', ' + row.Member.firstName}
            </Typography>
          </div>
        </Stack>
      );
    },
  },
  {
    name: 'Loan Status',
    sortable: true,
    formatter: (row): React.JSX.Element => {
      const mapping = {
        running: { label: 'Running', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        paid: { label: 'Paid', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
        overdue: { label: 'overdue', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
      } as const;

      function getMapping() {
        if (dayjs().isAfter(dayjs(row.dueDate)) && row.totalPayment <= Number(row.amountPayable))
          return mapping['overdue'];
        if (row.totalPayment >= Number(row.amountPayable)) return mapping['paid'];
        return mapping['running'];
      }

      const { label, icon } = getMapping();
      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
  },
  {
    name: 'Amortization Type',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {row.loanType}
      </Typography>
    ),
  },
  {
    name: 'No. of terms',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {row.termInMonths}
      </Typography>
    ),
  },
  {
    name: 'Date Released',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {dayjs(row.issueDate).format('MM-DD-YYYY')}
      </Typography>
    ),
  },
  {
    name: 'Voucher No.',
    sortable: true,
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {row.journalRef && row.JournalEntries?.referenceName}
      </Typography>
    ),
  },
  {
    name: 'Amount to pay',
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {formatToCurrency(Number(row.amountPayable), 'Fil-ph', 'Php')}
      </Typography>
    ),
  },
  {
    name: 'Total Amortizations Paid',
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2" color="text.primary">
        {formatToCurrency(Number(row.totalPayment), 'Fil-ph', 'Php')}
      </Typography>
    ),
  },
  {
    name: 'Actions',
    formatter: (row): React.JSX.Element => (
      <IconButton href={paths.dashboard.loans.view(row.loanId)} LinkComponent={RouterLink}>
        <Info />
      </IconButton>
    ),
  },
] as ColumnDef<ILoanType[0]>[];
export function LoanTable({ rows }: { rows: ILoanType }) {
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable columns={columns} rows={rows} />
    </Card>
  );
}
