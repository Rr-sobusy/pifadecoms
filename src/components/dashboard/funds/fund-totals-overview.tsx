import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { IconProps } from '@phosphor-icons/react';
import type { FundTransactionsType } from '@prisma/client';

import { formatToCurrency } from '@/lib/format-currency';

interface FundTotalOverviewProps {
  transactionType: FundTransactionsType;
  total: number;
  icon: React.ComponentType<IconProps>;
}

const fundTransactionMap: Record<FundTransactionsType, string> = {
  SavingsDeposit: 'Savings deposit',
  SavingsWithdrawal: 'Savings withdrawal',
  ShareCapDeposit: 'Share Capital deposit',
  ShareCapWithdrawal: 'Share Capital withdrawal',
};

function FundTotalOverview({ transactionType, icon, total }: FundTotalOverviewProps) {
  const Icon = icon;
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} position="relative">
          <Typography variant="caption" fontSize={15} fontWeight={500} color="textSecondary">
            Total {fundTransactionMap[transactionType]}
          </Typography>
          <Stack position="absolute" right={5} top={5}>
            <Icon size={22} />
          </Stack>
          <Typography variant="h6">{formatToCurrency(total)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FundTotalOverview;
