'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatToCurrency } from '@/lib/format-currency';

interface PageProps {
  totalSavingsInterestPayable: number;
  fiscalYear: number;
  interestRate: number;
}

function TotalSavingsInterestCard({ totalSavingsInterestPayable, fiscalYear, interestRate }: PageProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          {`Total Savings Interest Payable for Fiscal Year ${fiscalYear} with ${interestRate}% Interest Rate : ${formatToCurrency(totalSavingsInterestPayable)}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalSavingsInterestCard;
