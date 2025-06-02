'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { RepaymentStyle } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AgingLoanMap } from '@/actions/loans/aging-loans';
import { ColumnDef, DataTable } from '@/components/core/data-table';

const loanContractMap: Record<RepaymentStyle, string> = {
  Diminishing: 'Diminishing',
  StraightPayment: 'Straight Payment',
  OneTime: 'End of Term',
};

type Props = {
  data: AgingLoanMap;
};

type MemberRow = AgingLoanMap[string];

const columns = [
  {
    name: 'Loaner Name',
    formatter: (row) => <Typography variant="caption">{row.fullName}</Typography>,
  },
  {
    name: 'Loan Type',
    formatter: (row) => {
      return (
        <Stack direction="column">
          {row.agingLoans.map((loans) => (
            <Stack direction="row">
              <Typography variant="caption">{`${loanContractMap[loans.repaymentStyle]} in ${loans.sourceName}`}</Typography>
            </Stack>
          ))}
        </Stack>
      );
    },
  },
  {
    name: 'Loan Details',
    formatter: (row) => {
      return (
        <Stack direction="column">
          {row.agingLoans.map((loans) => (
            <Stack direction="row">
              <Typography variant="caption">{`Released on ${dayjs(loans.releaseDate).format('MM/DD/YYYY')} due on ${dayjs(loans.dueDate).format('MM/DD/YYYY')} with amount payable of ${formatToCurrency(loans.amountToPay)}`}</Typography>
            </Stack>
          ))}
        </Stack>
      );
    },
  },
  {
    name: 'Overdue from last payment to due date',
    formatter: (row) => (
      <Stack direction="column">
        {row.agingLoans.map((loan) => {
          const lastPaymentDate = loan.repayments.at(-1)?.paymentDate;
          if (loan.repaymentStyle === 'OneTime' || !lastPaymentDate) {
            return (
              <Typography key={loan.loanId} variant="caption">
                N/A
              </Typography>
            );
          }

          const dueDate = dayjs(loan.dueDate);
          const lastPayment = dayjs(lastPaymentDate);
          const diff = dueDate.diff(lastPayment, 'day');

          return (
            <Typography key={loan.loanId} variant="caption">
              {diff > 0 ? `${diff} days from last payment to due date` : 'Paid after due date'}
            </Typography>
          );
        })}
      </Stack>
    ),
  },
  {
    name: 'Overdue from due date to current date',
  },
] satisfies ColumnDef<MemberRow>[];

function AgingLoanTable({ data }: Props) {
  const memberRows = Object.entries(data).map(([_, memberData]) => memberData);

  return (
    <Card>
      <DataTable size="small" rows={memberRows} columns={columns} />
    </Card>
  );
}

export default AgingLoanTable;
