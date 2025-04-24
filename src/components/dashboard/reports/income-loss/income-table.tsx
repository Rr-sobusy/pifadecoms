'use client';

import React, { forwardRef } from 'react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { IncomeAndLossTypes } from '@/actions/reports/types';

interface Props {
  balances: IncomeAndLossTypes;
  searchParams: { startDate?: Date | string; endDate?: Date | string; isFilterOpen: boolean };
}

const IncomeAndLossTable = forwardRef<HTMLDivElement, Props>(({ balances, searchParams }, ref) => {
  const totalRevenue = balances.Revenue.reduce((acc, curr) => acc + curr.totalBalance, 0);
  const totalExpense = balances.Expense.reduce((acc, curr) => acc + curr.totalBalance, 0);

  const isSearchParamsEmpty = !searchParams || Object.keys(searchParams).length === 0;
  return (
    <Box ref={ref} padding={3}>
      <Stack sx={{ alignItems: 'center', marginY: 3 }}>
        <Typography variant="overline">Pinagsibaan Farmer&apos;s Development Multi-purpose Cooperative</Typography>
        <Typography fontWeight="700" fontSize="30px" variant="body1">
          Statement of Income and Loss
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {`${isSearchParamsEmpty ? 'Please select a target date' : `For the period ${dayjs(searchParams.startDate).format('MMMM DD YYYY')} to ${dayjs(searchParams.endDate).format('MMMM DD YYYY')}`}`}
        </Typography>
      </Stack>
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
                  {formatToCurrency(totalsPerCategory, 'Fil-ph', 'Php')}
                </Typography>
              </Stack>

              {accounts.map((account, idx) => (
                <Stack padding={2} key={idx}>
                  <Typography variant="h6">{account.parentAccount}</Typography>

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
            </Stack>
            <Typography variant="h6" sx={{ marginY: 2 }}>
              {`Total ${category} : ${formatToCurrency(totalsPerCategory, 'Fil-ph', 'Php')}`}
            </Typography>
          </>
        );
      })}
      <Stack>
        <Divider />
        <Typography
          color="error"
          paddingTop={3}
          textAlign="end"
          variant="h5"
          sx={{ marginY: 2, textDecoration: 'underline' }}
        >
          Net Income : {formatToCurrency(totalRevenue - totalExpense, 'Fil-ph', 'Php')}
        </Typography>
      </Stack>
    </Box>
  );
});

export default IncomeAndLossTable;
