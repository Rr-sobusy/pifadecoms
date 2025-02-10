'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card, { CardProps } from '@mui/material/Card';
import CardAction from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';

import { formatToCurrency } from '@/lib/format-currency';
import type { ILoanDetails } from '@/actions/loans/types';
import { ILoanType } from '@/actions/loans/types';
import type { AccounTreeType } from '@/actions/accounts/types';
import AmortizationTable from './amortization-tables';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
  accounts: AccounTreeType
}

function LoanAmortizationDetails({ loanDetails,accounts, ...props }: PageProps) {
  // aggregate all records that has field datePaid is not null
  const totalAmortizationPaid = React.useMemo(() => {
    if (!loanDetails?.Repayments) return 0; // Ensure Repayments exists

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
        <Stack spacing={3}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Info fontSize="var(--icon-fontSize-md)" />
            <Typography variant="h6">Ammorization Details</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2">Total amortization paid:</Typography>
            <Typography variant="body2" color="error">
              {formatToCurrency(Number(totalAmortizationPaid), 'Fil-ph', 'Php')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2">Terms Paid:</Typography>
            <Typography variant="body2">{amortizationPaidCount}</Typography>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Typography variant="h6">Amortization schedules</Typography>
            <AmortizationTable accounts={accounts} memberId={loanDetails?.Member.memberId} rows={loanDetails?.Repayments as ILoanType[0]['Repayments'][0][]} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default LoanAmortizationDetails;
