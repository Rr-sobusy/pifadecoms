'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type RepaymentStyle } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { type AgingLoanMap } from '@/actions/loans/aging-loans';
import { DataTable, type ColumnDef } from '@/components/core/data-table';

const loanContractMap: Record<RepaymentStyle, string> = {
  Diminishing: 'Diminishing',
  StraightPayment: 'Straight Payment',
  OneTime: 'End of Term',
};

const overDueInterest: Record<RepaymentStyle, number> = {
  Diminishing: 3.5,
  OneTime: 3.25,
  StraightPayment: 3.25,
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
    name: 'Interest on lapse from last payment to due date (Applied only on dimishing loans)',
    formatter: (row) => (
      <Stack direction="column">
        {row.agingLoans.map((loan) => {
          const lastPaymentDate = loan.repayments.at(-1)?.paymentDate;

          /**
           * * If there is no recorded repayment, count the span between the released and due date
           */
          const monthsLapsed = loan.repayments.length
            ? dayjs().diff(lastPaymentDate, 'month')
            : dayjs(loan.dueDate).diff(dayjs(loan.releaseDate), 'month');

          const totalAmortizationPaid = loan.repayments.reduce((acc, curr) => {
            return acc + Number(curr.principal);
          }, 0);

          const totalUnpaidPrincipal =
            totalAmortizationPaid < loan.amountToPay ? loan.amountToPay - totalAmortizationPaid : 0;

          const interestLapse = (totalUnpaidPrincipal * loan.interestRate * monthsLapsed) / 100;

          if (loan.repaymentStyle !== 'Diminishing' || !lastPaymentDate) {
            return (
              <Typography key={loan.loanId} variant="caption">
                N/A
              </Typography>
            );
          }

          return (
            <Typography key={loan.loanId} variant="caption">
              {`${formatToCurrency(interestLapse)} lapse for ${monthsLapsed} month/s`}
            </Typography>
          );
        })}
      </Stack>
    ),
  },
  {
    name: 'Interest on lapse from due date to current date (In all loans)',
    formatter: (row) => (
      <Stack direction="column">
        {row.agingLoans.map((loan) => {
          const lapseMonths = dayjs().diff(dayjs(loan.dueDate), 'month');

          const isLapsed = lapseMonths > 0;

          const totalAmortizationPaid = loan.repayments.reduce((acc, curr) => {
            return acc + Number(curr.principal);
          }, 0);

          const totalUnpaidPrincipal =
            totalAmortizationPaid < loan.amountToPay ? loan.amountToPay - totalAmortizationPaid : 0;

          const interest = isLapsed
            ? lapseMonths * (overDueInterest[loan.repaymentStyle] / 100) * totalUnpaidPrincipal
            : 0;

          return (
            <Typography key={loan.loanId} variant="caption">
              {isLapsed ? `${formatToCurrency(interest)} in ${lapseMonths} month/s` : 'No lapse'}
            </Typography>
          );
        })}
      </Stack>
    ),
  },
  {
    name: 'Total Computed Amt to pay (Remaining + interest)',
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
