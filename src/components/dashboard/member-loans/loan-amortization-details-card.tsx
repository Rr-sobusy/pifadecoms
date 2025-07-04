'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';
import { RepaymentStyle } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import type { ILoanDetails } from '@/actions/loans/types';
import { ILoanType } from '@/actions/loans/types';

import AmortizationTable from './amortization-tables';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
  accounts: AccounTreeType;
  isAdmin: boolean;
}

const loanContractMap: Record<RepaymentStyle, string> = {
  Diminishing: 'Diminishing 3.5%',
  StraightPayment: 'Straight Payment 3.25%',
  OneTime: 'End of Term 3.25%',
};

function LoanAmortizationDetails({ loanDetails, accounts, isAdmin, ...props }: PageProps) {
  const totalAmortizationPaid = React.useMemo(() => {
    if (!loanDetails?.Repayments) {
      return { totalPrincipalPaid: 0, totalInterestPaid: 0 };
    }

    return loanDetails.Repayments.filter((repayment) => repayment.paymentDate).reduce(
      (acc, curr) => {
        const principal = Number(curr.principal) || 0;
        const interest = Number(curr.interest) || 0;
        acc.totalPrincipalPaid += principal;
        acc.totalInterestPaid += interest;
        return acc;
      },
      { totalPrincipalPaid: 0, totalInterestPaid: 0 }
    );
  }, [loanDetails]);

  const penaltyInterest =
    loanDetails?.repStyle === 'Diminishing'
      ? calculateLapseInterest(
          loanDetails?.dueDate,
          Number(loanDetails?.amountPayable) - Number(totalAmortizationPaid.totalPrincipalPaid),
          loanDetails?.repStyle
        )
      : calculateLapseInterest(
          loanDetails?.dueDate,
          Number(loanDetails?.amountLoaned) -
            (Number(totalAmortizationPaid.totalPrincipalPaid) + Number(totalAmortizationPaid.totalInterestPaid)),
          loanDetails?.repStyle
        );

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
              {formatToCurrency(
                Number(totalAmortizationPaid.totalInterestPaid + totalAmortizationPaid.totalPrincipalPaid),
                'Fil-ph',
                'Php'
              )}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Typography variant="body2">
              {loanDetails?.loanStatus === 'Closed' && loanDetails?.repStyle !== 'Diminishing'
                ? 'Discount:'
                : 'Payment remaining:'}
            </Typography>
            <Typography variant="body2" color="error">
              {loanDetails?.repStyle === 'Diminishing'
                ? formatToCurrency(
                    Math.max(Number(loanDetails?.amountPayable) - Number(totalAmortizationPaid.totalPrincipalPaid), 0)
                  )
                : formatToCurrency(
                    Math.max(
                      Number(loanDetails.amountPayable) -
                        (Number(totalAmortizationPaid.totalInterestPaid) +
                          Number(totalAmortizationPaid.totalPrincipalPaid)),
                      0
                    )
                  )}
            </Typography>
          </Stack>

          {loanDetails?.loanStatus === 'Active' && (
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">{`Penalty Interest (${loanContractMap[loanDetails?.repStyle]}):`}</Typography>
              <Typography variant="body2" color="error">
                {`${formatToCurrency(Number(penaltyInterest.computedLapseInterest))} in ${
                  penaltyInterest.monthsLapse
                } month(s)`}
              </Typography>
            </Stack>
          )}

          <Divider />
          <Stack spacing={2}>
            <Typography variant="h6">Paid amortization/s</Typography>
            <AmortizationTable
              isAdmin={isAdmin}
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
  repStyle: RepaymentStyle
): { monthsLapse: number; computedLapseInterest: number } {
  const today = dayjs();
  const due = dayjs(dueDate);

  // If current date is before due date, no lapse interest
  if (today.isBefore(due)) {
    return { monthsLapse: 0, computedLapseInterest: 0 };
  }

  const monthsLapse = today.diff(due, 'month');

  const penaltyRates: Record<RepaymentStyle, number> = {
    StraightPayment: 3.25 / 100,
    Diminishing: 3.5 / 100,
    OneTime: 3.25 / 100,
  };

  const rate = penaltyRates[repStyle];

  const computedLapseInterest = Math.max(remainingBalance, 0) * rate * monthsLapse;

  return { monthsLapse, computedLapseInterest };
}

export default LoanAmortizationDetails;
