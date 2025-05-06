import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import NetSurplusMovement from './net-surplus-movement-chart';

interface NetSurplusCardProps {
  data: {
    month: string;
    netSurplus: number;
  }[];
}

function NetSurplusCard({ data }: NetSurplusCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack>
            <Typography fontWeight={600} variant="h6">
              Current year Net Surplus trend
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Visualization of Net Surplus movement
            </Typography>
          </Stack>
          <NetSurplusMovement data={data} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NetSurplusCard;
