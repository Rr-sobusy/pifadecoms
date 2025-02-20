import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import { JournalType } from '@prisma/client';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { fetchLedgers } from '@/actions/reports/general-ledger';
import LedgerFilterModal from '@/components/dashboard/reports/ledgers/filter-modal';
import GeneralLedgerTable from '@/components/dashboard/reports/ledgers/general-ledger-table';

interface PageProps {
  searchParams: {
    startDate: string | Date;
    endDate: string | Date;
    isFilterOpen: boolean;
    journalType: JournalType | 'All';
  };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { startDate, endDate, isFilterOpen, journalType } = searchParams;
  const generalLedgers = await fetchLedgers({ dateRange: { startDate, endDate }, journalType });

  function closeHandler() {
    console.log('Close Handler');
  }
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
            <Typography variant="h4">General Ledger</Typography>
          </Box>

          <Stack direction="row">
            <div>
              <Button
                variant="text"
                startIcon={<FilterIcon />}
                LinkComponent={Link}
                href={`${paths.dashboard.reports.ledgerList}?isFilterOpen=true`}
              >
                Filter lists
              </Button>
            </div>
            <div>
              <Button
                variant="text"
                startIcon={<ExportIcon />}
                LinkComponent={Link}
              >
                Export
              </Button>
            </div>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer&apos;s Development Multi-purpose Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            General Ledger of Accounts
          </Typography>
          <Typography color="textDisabled" variant="body2">
            From{' '}
            {searchParams.startDate
              ? dayjs(searchParams.startDate).format('MMM DD YYYY')
              : dayjs().subtract(30, 'day').format('MMM DD YYYY')}{' '}
            to{' '}
            {searchParams.endDate ? dayjs(searchParams.endDate).format('MMM DD YYYY') : dayjs().format('MMM DD YYYY')}
          </Typography>

          <Card sx={{ marginTop: 3 }}>
            <CardContent>
              <GeneralLedgerTable rows={generalLedgers} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
      <LedgerFilterModal open={Boolean(isFilterOpen)} />
    </Box>
  );
}

export default page;
