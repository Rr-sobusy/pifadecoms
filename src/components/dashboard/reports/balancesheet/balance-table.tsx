'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { BalanceSheetTypes } from '@/actions/reports/types';

interface Props {
  balances: BalanceSheetTypes;
}

const BalanceTable = React.forwardRef<HTMLDivElement, Props>(({ balances }, ref) => {
  const asOf = useSearchParams().get('asOf') || undefined;

  const totalContraryAssets = balances.Assets.filter((account) => account.isContra).reduce(
    (acc, curr) => acc + curr.totalBalance,
    0
  );
  const totalEquity = balances.Equity.reduce((acc, curr) => acc + curr.totalBalance, 0);
  const totalLiabilities = balances.Liability.reduce((acc, curr) => acc + curr.totalBalance, 0);

  return (
    <Box ref={ref} padding={3} sx={{ backgroundColor: '#fff', color: '#000' }}>
      <Stack sx={{ alignItems: 'center', marginY: 3 }}>
        <Typography variant="overline">Pinagsibaan Farmer&apos;s Development Multi-purpose Cooperative</Typography>
        <Typography fontWeight="700" fontSize="30px" variant="body1">
          Balance Sheet
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {`${asOf ? `As of ${dayjs(asOf).format('MMMM DD YYYY')}` : 'Please select a target date'}`}
        </Typography>
      </Stack>
      {Object.entries(balances).map(([category, accounts]) => {
        const totalsPerCategory = accounts.reduce((acc, curr) => acc + curr.totalBalance, 0);
        return (
          <React.Fragment key={category}>
            <Stack
              sx={{ backgroundColor: '#DBDBDD', marginTop: 2 }}
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
              <Stack padding={1} key={idx}>
                <Typography variant="subtitle2">
                  {account.isContra ? `${account.parentAccount} (Contra)` : account.parentAccount}
                </Typography>

                <ul>
                  {account.children.map((child, index) => (
                    <Stack gap={1} flexDirection="row" key={index}>
                      <Typography variant="caption" key={index}>
                        {child.accountName}:
                      </Typography>
                      <Typography variant="caption" key={index}>
                        {formatToCurrency(child.balance, 'Fil-ph', 'Php')}
                      </Typography>
                    </Stack>
                  ))}
                </ul>

                <Typography variant="body1">
                  Total {account.parentAccount}: {formatToCurrency(account.totalBalance, 'Fil-ph', 'Php')}
                </Typography>
              </Stack>
            ))}

            <Typography variant="h6" sx={{ marginY: 2 }}>
              {category === 'Assets'
                ? `Total ${category} : ${formatToCurrency(totalsPerCategory - totalContraryAssets, 'Fil-ph', 'Php')} - ${formatToCurrency(totalContraryAssets, 'Fil-ph', 'Php')}`
                : `Total ${category} : ${formatToCurrency(totalsPerCategory, 'Fil-ph', 'Php')}`}
            </Typography>
          </React.Fragment>
        );
      })}

      <Stack
        sx={{ backgroundColor: '#DBDBDD', marginTop: 4 }}
        paddingY={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography paddingLeft={4} paddingRight={2} fontWeight={600} variant="subtitle1">
          Liability + Equity
        </Typography>
        <Typography paddingLeft={4} paddingRight={2} fontWeight={600} variant="subtitle2">
          {formatToCurrency(totalLiabilities + totalEquity, 'Fil-ph', 'Php')} + accumulated Net Surplus
        </Typography>
      </Stack>
    </Box>
  );
});

export default BalanceTable;
BalanceTable.displayName = 'BalanceTable';
