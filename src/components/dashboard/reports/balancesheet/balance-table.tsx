'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { formatToCurrency } from '@/lib/format-currency';
import type { BalanceSheetTypes } from '@/actions/reports/types';
import { useTheme } from '@emotion/react';

type Props = {
  balances: BalanceSheetTypes;
};

function BalanceTable({ balances }: Props) {
  const theme = useTheme()
  return (
    <Box padding={3}>
      {Object.entries(balances).map(([category, accounts]) => (
        <Stack key={category}>
          <Typography sx={{backgroundColor : "#CCCED1"}} paddingLeft={4} paddingY={.5} variant='h5'>{category}</Typography>
          {accounts.map((account, idx) => (
            <div key={idx}>
              <h3>{account.parentAccount}</h3>

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
            </div>
          ))}
        </Stack>
      ))}
    </Box>
  );
}

export default BalanceTable;
