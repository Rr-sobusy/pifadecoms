import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunnelSimple, X } from '@phosphor-icons/react/dist/ssr';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';

import { paths } from '@/paths';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { getBalanceSheet } from '@/actions/reports/balance-sheet';
import { fetchIncomeAndLossReport } from '@/actions/reports/income-and-loss';
import IncomeAndLossFiltererModal from '@/components/dashboard/reports/income-loss/filterer-modal';
import IncomeTable from '@/components/dashboard/reports/income-loss/income-table';
import FilterModal from '@/components/dashboard/reports/transactions/account-transaction-filter-modal';

interface PageProps {
  searchParams: { filterList: boolean; isFilterOpen: boolean };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { filterList, isFilterOpen } = searchParams;
  const [accounts, balance, income] = await Promise.all([
    fetchAccountTree(),
    getBalanceSheet(),
    fetchIncomeAndLossReport(),
  ]);

  const isSearchParamsEmpty = !searchParams || Object.keys(searchParams).length === 0;
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
            <Typography variant="h4">Balance Sheet</Typography>
          </Box>

          <Stack spacing={1} flexDirection="row">
            {!isSearchParamsEmpty ? (
              <Button startIcon={<X />} LinkComponent={Link} href={paths.dashboard.reports.incomeAndLoss} color="error" variant="text">
                Clear filters
              </Button>
            ) : (
              <Button
                LinkComponent={Link}
                href={`${paths.dashboard.reports.incomeAndLoss}?isFilterOpen=true`}
                startIcon={<FunnelSimple />}
                variant="text"
              >
                Filter by date range
              </Button>
            )}
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
            Statement of Income And Loss
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From
          </Typography>
        </Stack>

        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ overflowX: 'auto' }}>
            {/* <BalanceTable balances={balance} /> */}
            <IncomeTable balances={income} />
          </Box>
        </Card>
      </Stack>
      <FilterModal accounts={accounts} open={Boolean(searchParams.filterList)} />
      <IncomeAndLossFiltererModal open={Boolean(isFilterOpen)} />
    </Box>
  );
}

export default page;
