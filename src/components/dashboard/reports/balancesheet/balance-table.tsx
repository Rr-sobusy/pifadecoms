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

function BalanceTable({ balances }: Props) {
  return (
    <Box padding={3}>
      {Object.entries(balances).map(([category, accounts]) => (
        <Stack key={category}>
          <Typography sx={{ backgroundColor: '#CCCED1' }} paddingLeft={4} paddingY={0.5} variant="h5">
            {category}
          </Typography>
          {accounts.map((account, idx) => (
            <Stack padding={2} key={idx}>
              <Typography variant='h6'>{account.parentAccount}</Typography>

              <ul>
                {account.children.map((child, index) => (
                  <li key={index}>
                    {child.accountName}: {formatToCurrency(child.balance, 'Fil-ph', 'Php')}
                  </li>
                ))}
              </ul>
              <p>
                Total {account.parentAccount}: {formatToCurrency(account.totalBalance, 'Fil-ph', 'Php')}
              </p>
            </Stack>
          ))}
        </Stack>
      ))}
    </Box>
  );
}

export default BalanceTable;