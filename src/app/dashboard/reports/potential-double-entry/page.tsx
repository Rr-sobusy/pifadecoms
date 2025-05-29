import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import type { Metadata } from 'next';
import { paths } from '@/paths';
import { fetchDoubleEntryPosted } from '@/actions/reports/account-transactions/fetch-double-entry-posted';
import DoubleEntryTranscationsTable from '@/components/dashboard/reports/double-entry/double-entry-transcations-table';
import FilterPeriod from '@/components/dashboard/reports/double-entry/filter-period';

interface PageProps {
  searchParams: { selectPeriod: boolean; startDate: Date; endDate: Date };
}

export const metadata:Metadata = {
  title : "Reports || Potential Double entries"
}


async function page({ searchParams }: PageProps) {
  const { selectPeriod } = searchParams;
  const potentialDoubleEntries = await fetchDoubleEntryPosted(searchParams.startDate, searchParams.endDate);

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
            <Typography variant="h4">Potential Multiple Posting Inquiry</Typography>
          </Box>
          <Stack direction="row">
            <div>
              <Button
                LinkComponent={Link}
                href={`${paths.dashboard.reports.potentialDoubleEntry}?selectPeriod=true`}
                startIcon={<FilterIcon />}
                variant="text"
              >
                Fiscal Period
              </Button>
            </div>
          </Stack>
        </Stack>
        <DoubleEntryTranscationsTable entries={potentialDoubleEntries} />
      </Stack>
      <FilterPeriod isDialogOpen={Boolean(selectPeriod)} />
    </Box>
  );
}

export default page;
