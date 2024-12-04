'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { calculateADB } from '@/lib/api-utils/calculate-adb';
import { dayjs } from '@/lib/dayjs';
import type { MemberFundsType } from '@/actions/funds/types';

type Props = {
  fund: MemberFundsType[0];
};

function AdbCalculator({ fund }: Props) {
  const rex = fund.Transactions.filter((transaction) => transaction.fundType === 'Savings');
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Average Daily Balance Calculator (Savings)
          </Typography>
          <Typography>
            {calculateADB(
              rex.sort((a, b) => a.fundTransactId - b.fundTransactId),
              dayjs('2024-01-01'),
              dayjs('2024-12-30'),
              fund.savingsBal
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AdbCalculator;
