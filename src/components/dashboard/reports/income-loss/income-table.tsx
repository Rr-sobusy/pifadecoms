'use client';

import React from 'react';
import Box from '@mui/material/Box';
import type { BalanceSheetTypes } from '@/actions/reports/types';

type Props = {
  balances: BalanceSheetTypes;
};

function IncomeTable({ balances, data }: Props) {
  console.log(data)
  return (
    <Box padding={3}>
     
    </Box>
  );
}

export default IncomeTable;
