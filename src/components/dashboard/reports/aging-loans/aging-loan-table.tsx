'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RepaymentStyle } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { AgingLoanMap } from '@/actions/loans/aging-loans';
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
          {row.agingLoans.map((loans, index) => (
            <Stack key={index} direction="row">
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
          {row.agingLoans.map((loans, index) => (
            <Stack key={index} direction="row">
              <Typography variant="caption">{`Released on ${dayjs(loans.releaseDate).format('MM/DD/YYYY')} due on ${dayjs(loans.dueDate).format('MM/DD/YYYY')} with amount payable of ${formatToCurrency(loans.amountToPay)}`}</Typography>
            </Stack>
          ))}
        </Stack>
      );
    },
  },
  {
    name: 'Balance Remaining',
    formatter: (row) => (
      <Stack direction="column">
        {row.agingLoans.map((loan) => {
          const totalAmortizationPaid = loan.repayments.reduce((acc, curr) => {
            if (loan.repaymentStyle === 'Diminishing') {
              return acc + Number(curr.principal);
            }
            return acc + (Number(curr.principal) + Number(curr.interest));
          }, 0);

          return (
            <Typography key={loan.loanId} variant="subtitle2">
              {formatToCurrency(loan.amountToPay - totalAmortizationPaid)}
            </Typography>
          );
        })}
      </Stack>
    ),
  },
  {
    name: 'Due 3 to 12 months from due date (30%)',
    formatter: (row) => (
      <Stack direction="column">
        {row.agingLoans.map((loan) => {
          const lapseMonths = dayjs().diff(dayjs(loan.dueDate), 'month');

          const totalAmortizationPaid = loan.repayments.reduce((acc, curr) => {
            if (loan.repaymentStyle === 'Diminishing') {
              return acc + Number(curr.principal);
            }
            return acc + (Number(curr.principal) + Number(curr.interest));
          }, 0);

          const totalBalanceUnpaid =
            loan.amountToPay > totalAmortizationPaid ? loan.amountToPay - totalAmortizationPaid : 0;

          return (
            <Typography key={loan.loanId} variant="subtitle2">
              {`${lapseMonths < 12 ? formatToCurrency(totalBalanceUnpaid * 0.3) : formatToCurrency(0)}`}
            </Typography>
          );
        })}
      </Stack>
    ),
  },
  {
    name: 'Due 12 months from due date (100%)',
    formatter: (row) => {
      return (
        <Stack>
          {row.agingLoans.map((loan) => {
            const lapseMonths = dayjs().diff(dayjs(loan.dueDate), 'month');

            const totalAmortizationPaid = loan.repayments.reduce((acc, curr) => {
              if (loan.repaymentStyle === 'Diminishing') {
                return acc + Number(curr.principal);
              }
              return acc + (Number(curr.principal) + Number(curr.interest));
            }, 0);

            const totalBalanceUnpaid =
              loan.amountToPay > totalAmortizationPaid ? loan.amountToPay - totalAmortizationPaid : 0;

            return (
              <Typography key={loan.loanId} variant="subtitle2">
                {`${lapseMonths <= 12 ? formatToCurrency(totalBalanceUnpaid) : formatToCurrency(0)}`}
              </Typography>
            );
          })}
        </Stack>
      );
    },
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
