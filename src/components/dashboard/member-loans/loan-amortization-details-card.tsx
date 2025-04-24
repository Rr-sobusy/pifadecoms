'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import type { ILoanDetails } from '@/actions/loans/types';
import { ILoanType } from '@/actions/loans/types';

import AmortizationTable from './amortization-tables';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
  accounts: AccounTreeType;
}

function LoanAmortizationDetails({ loanDetails, accounts, ...props }: PageProps) {
  const totalAmortizationPaid = React.useMemo(() => {
    if (!loanDetails?.Repayments) return 0;

    return loanDetails.Repayments.filter((repayment) => repayment.paymentDate)
      .reduce((acc, curr) => {
        const principal = Number(curr.principal) || 0;
        const interest = Number(curr.interest) || 0;
        return acc + principal + interest;
      }, 0)
      .toFixed(2);
  }, [loanDetails]);

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Info fontSize="var(--icon-fontSize-md)" />
            <Typography variant="h6">Amortization Details</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2">Total amortization paid:</Typography>
            <Typography variant="body2" color="error">
              {formatToCurrency(Number(totalAmortizationPaid), 'Fil-ph', 'Php')}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Typography variant="body2">
              {loanDetails?.loanStatus === 'Closed' && loanDetails?.repStyle !== 'Diminishing'
                ? 'Discount'
                : 'Payment remaining'}
            </Typography>
            <Typography variant="body2" color="error">
              {formatToCurrency(Number(loanDetails.amountPayable) - Number(totalAmortizationPaid), 'Fil-ph', 'Php')}
            </Typography>
          </Stack>

          {loanDetails?.loanStatus === 'Active' && (
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">Penalty interest:</Typography>
              <Typography variant="body2" color="error">
                {`${formatToCurrency(
                  calculateLapseInterest(
                    dayjs(loanDetails.dueDate).toDate(),
                    Number(loanDetails?.amountPayable) - Number(totalAmortizationPaid),
                    2
                  ).computedLapseInterest,
                  'Fil-ph',
                  'Php'
                )} in ${
                  calculateLapseInterest(
                    dayjs(loanDetails.dueDate).toDate(),
                    Number(loanDetails?.amountPayable) - Number(totalAmortizationPaid),
                    Number(loanDetails?.interestRate)
                  ).monthsLapse
                } month(s)`}
              </Typography>
            </Stack>
          )}

          <Divider />
          <Stack spacing={2}>
            <Typography variant="h6">Paid amortization/s</Typography>
            <AmortizationTable
              loanId={loanDetails?.loanId}
              accounts={accounts}
              memberId={loanDetails?.Member.memberId}
              rows={loanDetails?.Repayments as ILoanType[0]['Repayments'][0][]}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function calculateLapseInterest(
  dueDate: Date,
  remainingBalance: number,
  interest: number
): { monthsLapse: number; computedLapseInterest: number } {
  const monthsLapse = dayjs().diff(dayjs(dueDate), 'month');

  if (dayjs().toDate() < dayjs(dueDate).toDate()) {
    return { monthsLapse: 0, computedLapseInterest: 0 };
  }

  return {
    monthsLapse,
    computedLapseInterest: (remainingBalance * interest * monthsLapse) / 100,
  };
}

export default LoanAmortizationDetails;
