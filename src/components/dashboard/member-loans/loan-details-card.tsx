import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import type { ILoanDetails } from '@/actions/loans/types';
import { Typography } from '@mui/material';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
}

function LoanDetailsCard({ loanDetails, ...props }: PageProps) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography>{loanDetails?.loanId.toString()}</Typography>
      </CardContent>
    </Card>
  );
}

export default LoanDetailsCard;
