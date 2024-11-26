'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowBendRightDown as WithdrawIcon } from '@phosphor-icons/react/dist/ssr/ArrowBendRightDown';
import { Bank } from '@phosphor-icons/react/dist/ssr/Bank';
import { CashRegister as TransactIcon } from '@phosphor-icons/react/dist/ssr/CashRegister';
import { PiggyBank } from '@phosphor-icons/react/dist/ssr/PiggyBank';
import { FundTransactionsType } from '@prisma/client';
import { useRouter, usePathname } from 'next/navigation';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { FundTransactions, MemberFundsType } from '@/actions/funds/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

type SavingsCardProps = {
  rows: MemberFundsType[0]['Transactions'];
};

const FundTransactionMap: Record<FundTransactionsType, string> = {
  SavingsDeposit: 'Deposit',
  SavingsWithdrawal: 'Withdrawal',
  ShareCapDeposit: 'Capital Deposit',
  ShareCapWithdrawal: 'Capital Withdrawal',
};

const columns = [
  {
    name: 'Type',
    formatter: (row) => (
      <Stack alignItems="center" flexDirection="row" gap={2}>
        <Avatar
          sx={{
            '--Avatar-size': '40px',
            bgcolor: 'var(--mui-palette-background-paper)',
            boxShadow: 'var(--mui-shadows-8)',
            color: 'var(--mui-palette-text-primary)',
          }}
        >
          <PiggyBank color="text.secondary" />
        </Avatar>
        <Stack>
          <Typography fontWeight={600} variant="subtitle2">
            {FundTransactionMap[row.transactionType]}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {dayjs().format('MMM DD YYYY')}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    name: 'Reference',
    formatter: (row) => (
      <Stack>
        <Typography fontWeight={600} variant="subtitle2">
          Reference No.
        </Typography>
        <Typography color="text.secondary" variant="caption">
         {row.JournalEntries?.referenceName ?? null}
        </Typography>
      </Stack>
    ),
  },
  {
    name: 'Posted Amount',
    formatter: (row) => {
      const textColor = row.transactionType === 'SavingsDeposit' ? 'success' : 'error';
      const transactionBalance =
        row.transactionType === 'SavingsDeposit'
          ? `+${formatToCurrency(row.postedBalance, 'Fil-ph', 'Php')}`
          : `-${formatToCurrency(row.postedBalance, 'Fil-ph', 'Php')}`;
      return (
        <Stack>
          <Typography color={textColor} fontWeight={600} variant="subtitle1">
            {transactionBalance}
          </Typography>
        </Stack>
      );
    },
  },
] satisfies ColumnDef<MemberFundsType[0]['Transactions'][0]>[];

function SavingsCard({ rows }: SavingsCardProps) {
  const router = useRouter()
  const pathName = usePathname()

  function addSavingsDeposit(){
      const searchParams = new URLSearchParams()
      searchParams.set("transactionType", "savingsDeposit")
      
      //* Trigger open of the modal
      router.push(`${pathName}?${searchParams.toString()}`)
  }

  function addSavingsWithdrawal(){
    
  }
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Member Savings
          </Typography>
          <Grid container spacing={2}>
            <Grid
              size={{
                md: 6,
                xl: 6,
                xs: 12,
              }}
            >
              <Card>
                <CardContent sx={{ height: 150 }}>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack>
                      <Typography fontWeight={600} variant="subtitle1">
                        Current Balance
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        Member savings as of today
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        '--Avatar-size': '55px',
                        bgcolor: 'var(--mui-palette-background-paper)',
                        boxShadow: 'var(--mui-shadows-8)',
                        color: 'var(--mui-palette-text-primary)',
                      }}
                    >
                      <Bank fontSize="var(--icon-fontSize-lg)" />
                    </Avatar>
                  </Stack>
                  <Typography marginTop={3} fontWeight={700} variant="h6">
                    {formatToCurrency(50000, 'Fil-ph', 'Php')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              size={{
                md: 6,
                xl: 6,
                xs: 12,
              }}
            >
              <Card>
                <CardContent sx={{ height: 150 }}>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack>
                      <Typography fontWeight={600} variant="subtitle1">
                        Quick Actions
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        Manage member savings
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        '--Avatar-size': '55px',
                        bgcolor: 'var(--mui-palette-background-paper)',
                        boxShadow: 'var(--mui-shadows-8)',
                        color: 'var(--mui-palette-text-primary)',
                      }}
                    >
                      <TransactIcon fontSize="var(--icon-fontSize-lg)" />
                    </Avatar>
                  </Stack>
                  <Stack flexDirection="row" gap={2}>
                    <Button onClick={addSavingsDeposit} startIcon={<PiggyBank />} variant="contained">
                      Deposit
                    </Button>
                    <Button onClick={addSavingsWithdrawal} startIcon={<WithdrawIcon />} variant="outlined">
                      Withdraw
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Card>
            <CardContent>
              <Stack>
                <Typography fontWeight={600} variant="subtitle1">
                  Previous Transactions
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Member previous transactions up-to date
                </Typography>
              </Stack>

              <DataTable<MemberFundsType[0]['Transactions'][0]>
                sx={{ marginTop: 3 }}
                hideHead
                columns={columns}
                rows={rows}
              />
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SavingsCard;
