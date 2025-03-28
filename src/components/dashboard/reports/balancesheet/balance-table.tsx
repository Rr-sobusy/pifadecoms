'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatToCurrency } from '@/lib/format-currency';
import type { BalanceSheetTypes } from '@/actions/reports/types';

interface Props {
  balances: BalanceSheetTypes;
}

function BalanceTable({ balances }: Props) {
  const totalContraryAssets = balances.Assets.filter((account) => account.isContra).reduce(
    (acc, curr) => acc + curr.totalBalance,
    0
  );
  const totalEquity = balances.Equity.reduce((acc, curr) => acc + curr.totalBalance, 0);
  const totalLiabilities = balances.Liability.reduce((acc, curr) => acc + curr.totalBalance, 0);
  return (
    <Box padding={3}>
      {Object.entries(balances).map(([category, accounts]) => {
        const totalsPerCategory = accounts.reduce((acc, curr) => acc + curr.totalBalance, 0);
        return (
          <>
            <Stack key={category}>
              <Stack
                sx={{ backgroundColor: '#DBDBDD' }}
                paddingY={1}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography paddingLeft={4} paddingRight={2} fontWeight={600} variant="subtitle1">
                  {category}
                </Typography>
                <Typography paddingLeft={4} paddingRight={2} variant="subtitle2">
                  {category === 'Assets'
                    ? formatToCurrency(totalsPerCategory - totalContraryAssets * 2, 'Fil-ph', 'Php')
                    : formatToCurrency(totalsPerCategory, 'Fil-ph', 'Php')}
                </Typography>
              </Stack>
              {accounts.map((account, idx) => (
                <Stack padding={2} key={idx}>
                  <Typography variant="h6">
                    {account.isContra ? `${account.parentAccount} (Contra)` : account.parentAccount}
                  </Typography>

                  <ul>
                    {account.children.map((child, index) => (
                      <Typography variant="subtitle2" key={index}>
                        {child.accountName}: {formatToCurrency(child.balance, 'Fil-ph', 'Php')}
                      </Typography>
                    ))}
                  </ul>
                  <Typography variant="body1">
                    Total {account.parentAccount}: {formatToCurrency(account.totalBalance, 'Fil-ph', 'Php')}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Typography variant="h6" sx={{ marginY: 2 }}>
              {category === 'Assets'
                ? `Total ${category} : ${formatToCurrency(totalsPerCategory - totalContraryAssets, 'Fil-ph', 'Php')} - ${formatToCurrency(totalContraryAssets, 'Fil-ph', 'Php')}`
                : `Total ${category} : ${formatToCurrency(totalsPerCategory, 'Fil-ph', 'Php')}`}
            </Typography>
          </>
        );
      })}
      <Stack
        sx={{ backgroundColor: '#DBDBDD' }}
        paddingY={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography paddingLeft={4} paddingRight={2} fontWeight={600} variant="subtitle1">
          Liability + Equity
        </Typography>
        <Typography paddingLeft={4} paddingRight={2} fontWeight={600} variant="subtitle2">
          {formatToCurrency(totalLiabilities + totalEquity, 'Fil-ph', 'Php')}
        </Typography>
      </Stack>
    </Box>
  );
}

export default BalanceTable;
