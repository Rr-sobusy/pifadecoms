import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { TopStockHoldersType } from '@/actions/overview/types';

import TopStockHoldersChart from './top-stock-holders-chart';

interface TopStockHoldersCardProps {
  rows: TopStockHoldersType;
}

function TopStockHoldersCard({ rows }: TopStockHoldersCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack>
            <Typography fontWeight={600} variant="h6">
              Major Shareholders
            </Typography>
            <Typography variant="caption" color='textSecondary'>Lists of the top 20 major shareholderss</Typography>
          </Stack>
          <TopStockHoldersChart rows={rows} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TopStockHoldersCard;
