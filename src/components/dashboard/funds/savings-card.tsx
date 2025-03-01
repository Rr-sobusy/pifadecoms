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
import { ArrowBendRightDown as WithdrawIcon } from '@phosphor-icons/react/dist/ssr/ArrowBendRightDown';
import { Bank } from '@phosphor-icons/react/dist/ssr/Bank';
import { CashRegister as TransactIcon } from '@phosphor-icons/react/dist/ssr/CashRegister';
import { PiggyBank } from '@phosphor-icons/react/dist/ssr/PiggyBank';
import { Calculator as CalcuIcon } from '@phosphor-icons/react/dist/ssr/Calculator';
import { FundTransactionsType } from '@prisma/client';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { MemberFundsType } from '@/actions/funds/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';

import FundTransactionPaginator from './fund-transcaction-table-paginator';

interface SavingsCardProps {
  fund: MemberFundsType[0];
}

interface SearchParams {
  transactionType: FundTransactionsType;
}



function toURLSearchParams(params: Partial<SearchParams>): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.append(key, value);
  }
  return searchParams;
}

const FundTransactionMap: Record<FundTransactionsType, string> = {
  SavingsDeposit: 'Deposit',
  SavingsWithdrawal: 'Withdrawal',
  ShareCapDeposit: 'Capital Deposit',
  ShareCapWithdrawal: 'Capital Withdrawal',
};

const GetIcon = (transType: FundTransactionsType): React.JSX.Element | undefined => {
  if (transType === 'SavingsDeposit') return <PiggyBank color="text.secondary" />;
  if (transType === 'SavingsWithdrawal') return <WithdrawIcon color="text.secondary" />;

  return undefined;
};

const columns = [
  {
    name: 'Type',
    formatter: (row) => {
      return (
        <Stack alignItems="center" flexDirection="row" gap={2}>
          <Avatar
            sx={{
              '--Avatar-size': '40px',
              bgcolor: 'var(--mui-palette-background-paper)',
              boxShadow: 'var(--mui-shadows-8)',
              color: 'var(--mui-palette-text-primary)',
            }}
          >
            {GetIcon(row.transactionType)}
          </Avatar>
          <Stack>
            <Typography fontWeight={600} variant="subtitle2">
              {FundTransactionMap[row.transactionType]}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {dayjs(row.JournalEntries?.entryDate).format('MMM DD YYYY')}
            </Typography>
          </Stack>
        </Stack>
      );
    },
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
    name: 'New Balance',
    formatter: (row) => (
      <Stack>
        <Typography fontWeight={600} variant="subtitle2">
          New Balance
        </Typography>
        <Typography color="text.secondary" variant="caption">
          {formatToCurrency(Number(row.newBalance), 'Fil-ph', 'Php')}
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

function SavingsCard({ fund }: SavingsCardProps) {
  const router = useRouter();
  const pathName = usePathname();

  /**
   * * States used for showing data in data table with pagination
   */
  const currentSavingsTransactions = fund.Transactions.filter((ctx) => ctx.fundType === 'Savings');
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const paginatedData = currentSavingsTransactions.slice(currentPage * 5, (currentPage + 1) * 5);

  function addSavingsDeposit() {
    const urlSearchParams = toURLSearchParams({ transactionType: 'SavingsDeposit' });

    //* Trigger open of the modal
    router.push(`${pathName}?${urlSearchParams.toString()}`);
  }

  function addSavingsWithdrawal() {
    const urlSearchParams = toURLSearchParams({ transactionType: 'SavingsWithdrawal' });

    //* Trigger open of the modal
    router.push(`${pathName}?${urlSearchParams.toString()}`);
  }

  function computeAdb(){
    router.push(`${pathName}?computeAdb=Savings`)
  }

  function handlePageChange(_: React.MouseEvent<HTMLButtonElement> | null, currPage: number) {
    setCurrentPage(currPage);
  }

  const currentSavings = fund.savingsBal;

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
                        Current Savings&apos; Balance
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
                    {formatToCurrency(currentSavings, 'Fil-ph', 'Php')}
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
                    <Button onClick={computeAdb} variant='text' startIcon={<CalcuIcon />}>
                      Compute ADB & Interest
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
              <>
                <DataTable<MemberFundsType[0]['Transactions'][0]>
                  sx={{ marginTop: 3 }}
                  hideHead
                  columns={columns}
                  rows={paginatedData}
                />
                {!fund.Transactions.length ? (
                  <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      No transactions found.
                    </Typography>
                  </Box>
                ) : null}
              </>
              <Divider />
              <FundTransactionPaginator
                currentPage={currentPage}
                count={currentSavingsTransactions.length}
                handlePageChange={handlePageChange}
              />
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SavingsCard;
