import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { FileArchive as CompareIcon } from '@phosphor-icons/react/dist/ssr/FileArchive';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';
import { getBalanceSheet } from '@/actions/reports/balance-sheet';
import FilterModal from '@/components/dashboard/reports/transactions/account-transaction-filter-modal';
import IncomeTable from '@/components/dashboard/reports/income-loss/income-table';

interface PageProps {
  searchParams: { filterList: boolean };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const [accounts, balance] = await Promise.all([fetchAccountTree(), getBalanceSheet()]);

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
            <Button startIcon={<CompareIcon />} variant="text">
              Reconcile/Unrencile Records
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
            Statement of Income And Loss
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From
          </Typography>
        </Stack>

        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ overflowX: 'auto' }}>
            {/* <BalanceTable balances={balance} /> */}
            <IncomeTable balances={balance} />
          </Box>
        </Card>
      </Stack>
      <FilterModal accounts={accounts} open={Boolean(searchParams.filterList)} />
    </Box>
  );
}

export default page;
