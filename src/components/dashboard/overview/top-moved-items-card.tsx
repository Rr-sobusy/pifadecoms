import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TopMovedItemsChart from './top-moved-items-chart';

interface TopMovedItemProps {
  data: {
    itemName: string;
    quantityPurchased: number;
  }[];
}

function TopMovedItemsCard({ data }: TopMovedItemProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack>
            <Typography fontWeight={600} variant="h6">
              Best moving items
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Lists of best selling items in Invoice module (last 30 days)
            </Typography>
          </Stack>
          <TopMovedItemsChart data={data} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TopMovedItemsCard;
