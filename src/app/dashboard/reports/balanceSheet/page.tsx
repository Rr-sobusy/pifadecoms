import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CalendarDots } from '@phosphor-icons/react/dist/ssr';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';

import { dayjs } from '@/lib/dayjs';
import Link from 'next/link';
import { getBalanceSheet } from '@/actions/reports/balance-sheet';
import BalanceTable from '@/components/dashboard/reports/balancesheet/balance-table';
import BalanceSheetFilterModal from '@/components/dashboard/reports/balancesheet/filter-modal';
import { paths } from '@/paths';

interface PageProps {
  searchParams: { filterList: boolean; asOf?: Date | string };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { filterList, asOf } = searchParams;

  const balances = await getBalanceSheet(asOf ? dayjs(asOf).endOf('day').toDate() : undefined);

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
            <Button LinkComponent={Link} href={`${paths.dashboard.reports.balanceSheet}?filterList=true`} startIcon={<CalendarDots />} variant="text">
              Select target date
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
            Balance Sheet
          </Typography>
          <Typography color="textDisabled" variant="body2">
            {`${asOf ? `As of ${dayjs(asOf).format('MMMM DD, YYYY')}` : 'Please select a target date'}`}
          </Typography>
        </Stack>

        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ overflowX: 'auto' }}>
            <BalanceTable balances={balances} />
          </Box>
        </Card>
      </Stack>
      <BalanceSheetFilterModal open={Boolean(filterList)} />
    </Box>
  );
}

export default page;
