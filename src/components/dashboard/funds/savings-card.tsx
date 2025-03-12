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
import { Calculator as CalcuIcon } from '@phosphor-icons/react/dist/ssr/Calculator';
import { CashRegister as TransactIcon } from '@phosphor-icons/react/dist/ssr/CashRegister';
import { PiggyBank } from '@phosphor-icons/react/dist/ssr/PiggyBank';
import { FundTransactionsType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { deleteFundTransaction } from '@/actions/funds/delete-fund-transaction';
import type { MemberFundsType } from '@/actions/funds/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';
import { toast } from '@/components/core/toaster';

import FundTransactionPaginator from './fund-transcaction-table-paginator';

interface SavingsCardProps {
  fund: MemberFundsType[0];
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
          ? `+${formatToCurrency(Number(row.postedBalance), 'Fil-ph', 'Php')}`
          : `-${formatToCurrency(Number(row.postedBalance), 'Fil-ph', 'Php')}`;
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

  /**
   * * States for selected rows for deleting transaction
   */
  const [selectedRow, setSelectedRow] = React.useState<MemberFundsType[0]['Transactions'][0][]>([]);

  function navigateWithQuery(transactionType: FundTransactionsType) {
    const searchParams = new URLSearchParams({ transactionType });
    router.push(`${pathName}?${searchParams.toString()}`);
  }

  function handlePageChange(_: React.MouseEvent<HTMLButtonElement> | null, currPage: number) {
    setCurrentPage(currPage);
  }

  const currentSavings = fund.savingsBal;

  function handleSelectOne(_: React.ChangeEvent, row: MemberFundsType[0]['Transactions'][0]) {
    if (selectedRow.length === 0) {
      setSelectedRow((prev) => {
        const isAlreadySelected = prev.some((ctx) => ctx.fundTransactId === row.fundTransactId);

        return isAlreadySelected ? prev.filter((ctx) => ctx.fundTransactId !== row.fundTransactId) : [...prev, row];
      });
    }
  }

  function handleDeselecteOne(_: React.ChangeEvent, row: MemberFundsType[0]['Transactions'][0]) {
    if (selectedRow.length === 1) {
      setSelectedRow((prev) => {
        const isAlreadySelected = prev.some((ctx) => ctx.fundTransactId === row.fundTransactId);

        return isAlreadySelected ? prev.filter((ctx) => ctx.fundTransactId !== row.fundTransactId) : [...prev, row];
      });
    }
  }

  async function deleteTransactionHandler() {
    if (selectedRow.length) {
      const result = await deleteFundTransaction(selectedRow[0].fundTransactId);

      if (result?.data?.success) {
        toast.success(
          'Fund transaction deleted and negated. You can now delete it from acct transactions to negate financial statement.'
        );
      }
    }
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
                    <Button
                      onClick={() => navigateWithQuery('SavingsDeposit')}
                      startIcon={<PiggyBank />}
                      variant="contained"
                    >
                      Deposit
                    </Button>
                    <Button
                      onClick={() => navigateWithQuery('SavingsWithdrawal')}
                      startIcon={<WithdrawIcon />}
                      variant="outlined"
                    >
                      Withdraw
                    </Button>
                    <Button
                      onClick={() => router.push(`${pathName}?computeAdb=Savings`)}
                      variant="text"
                      startIcon={<CalcuIcon />}
                    >
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
              <Stack alignItems="flex-end">
                <div>
                  <Button
                    onClick={deleteTransactionHandler}
                    disabled={selectedRow.length !== 1}
                    variant="contained"
                    color="error"
                  >
                    Delete selected row
                  </Button>
                </div>
              </Stack>
              <>
                <DataTable<MemberFundsType[0]['Transactions'][0]>
                  onSelectOne={handleSelectOne}
                  onDeselectOne={handleDeselecteOne}
                  selected={new Set(selectedRow.map((r) => r.fundTransactId))}
                  uniqueRowId={(row) => Number(row.fundTransactId)}
                  selectable
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
