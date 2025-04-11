import React from 'react';
import RouterLink from 'next/link';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';
import type { JournalType } from '@prisma/client';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import {
  fetchAccountTransactions,
  fetchSingleAccountTransaction,
} from '@/actions/reports/account-transactions/account-transactions';
import FilterModal from '@/components/dashboard/reports/transactions/account-transaction-filter-modal';
import TransactionsTable from '@/components/dashboard/reports/transactions/account-transactions-table';
import TransactionDialog from '@/components/dashboard/reports/transactions/transaction-dialog';

interface PageProps {
  searchParams: {
    filterList: boolean;

    memberId: string;
    accountId: string;
    journalType: JournalType;
    startDate: Date;
    endDate: Date;
    entryId: bigint;
    referenceName: string;
  };
}
async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { memberId, accountId, startDate, endDate, entryId, journalType, referenceName } = searchParams;
  const filters = { memberId, accountId, startDate, endDate, journalType, referenceName };
  const [accountTransactions, accounts, singleAccountTransaction] = await Promise.all([
    fetchAccountTransactions(filters),
    fetchAccountTree(),
    fetchSingleAccountTransaction(entryId),
  ]);


  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Account Transactions</Typography>
          </Box>

          <Stack spacing={1} flexDirection="row">
            {Object.keys(searchParams).length > 0 && !searchParams.filterList && (
              <Button
                LinkComponent={RouterLink}
                href={paths.dashboard.reports.accountTransaction}
                startIcon={<CloseIcon />}
                variant="text"
                color="error"
              >
                Clear Filters
              </Button>
            )}
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.reports.accountTransaction}?filterList=true`}
              startIcon={<FilterIcon />}
              variant="text"
            >
              Filters
            </Button>
            <Button startIcon={<ExportIcon />} variant="text">
              Export
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer&apos;s Development Multi-purpose Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            Account Transactions History
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From{' '}
            {Object.keys((searchParams.startDate && searchParams.endDate) || {}).length
              ? `${dayjs(searchParams.startDate).format('MMM DD YYYY')} to ${dayjs(searchParams.endDate).format('MMM DD YYYY')}`
              : 'last 1000 records'}
          </Typography>
        </Stack>

        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ overflowX: 'auto' }}>
            <TransactionsTable accountTransactions={accountTransactions} />
          </Box>
        </Card>
      </Stack>
      <FilterModal accounts={accounts} />
      <TransactionDialog accountTransactions={singleAccountTransaction} />
    </Box>
  );
}

export default page;
