'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';

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

  const amortizationPaidCount = loanDetails?.Repayments.filter((repayments) => repayments.paymentDate).length;

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
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
            <Typography variant="body2">Terms Paid:</Typography>
            <Typography variant="body2" color="error">
              {amortizationPaidCount}
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

export default LoanAmortizationDetails;
