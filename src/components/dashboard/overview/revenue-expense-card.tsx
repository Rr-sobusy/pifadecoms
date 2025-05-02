import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Props = {};

function RevenueExpenseCard({}: Props) {
  return (
    <Card>
      <CardContent>
        <Stack>
          <Typography fontWeight={600} variant="h6">Current year income and expense overview</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RevenueExpenseCard;
