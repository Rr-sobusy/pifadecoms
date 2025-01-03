'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatToCurrency } from '@/lib/format-currency';
import type { BalanceSheetTypes } from '@/actions/reports/types';

type Props = {
  balances: BalanceSheetTypes;
};

function IncomeTable({ balances }: Props) {
  return (
    <Box padding={3}>
     
    </Box>
  );
}

export default IncomeTable;
