import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchChartofAccounts, fetchRootAccounts } from '@/actions/accounts/fetch-accounts';
import { AccountsTable } from '@/components/dashboard/finance/accounts-table';
import { AddNewAccountDiaglog } from '@/components/dashboard/finance/add-account-dialog';
import ManualJournalTable from '@/components/dashboard/finance/manual-journal-table';
import { fetchJournals } from '@/actions/journals/fetch-journals';

type PageProps = {};

async function page({}: PageProps):Promise<React.JSX.Element> {
  const manualJournals = await fetchJournals()
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
            <Typography variant="h4">Manual Journals</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href={`${paths.dashboard.finance.journalCreate}`} variant="contained">
              Add Entry
            </Button>
          </Box>
        </Stack>
        <ManualJournalTable journal={manualJournals} />
      </Stack>
    </Box>
  );
}

export default page;
