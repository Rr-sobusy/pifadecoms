import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import RevenueExpenseChart from './revenue-expense-chart';

interface MonthlyIncomeExpenseProps {
  data: {
    month: string;
    Revenue: number;
    Expense: number;
  }[];
}

function RevenueExpenseCard({ data }: MonthlyIncomeExpenseProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack>
            <Typography fontWeight={600} variant="h6">
              Current year income and expense overview
            </Typography>
            <Typography variant="subtitle2"></Typography>
          </Stack>
          <Stack>
            <RevenueExpenseChart data={data} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RevenueExpenseCard;
