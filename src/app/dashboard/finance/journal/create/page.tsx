import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchAccountTree, fetchChartofAccounts, fetchRootAccounts } from '@/actions/accounts/fetch-accounts';
import { AccountsTable } from '@/components/dashboard/finance/accounts-table';
import { AddNewAccountDiaglog } from '@/components/dashboard/finance/add-account-dialog';
import NewJournalFrom from '@/components/dashboard/finance/new-journal-form';

type PageProps = {};

async function page({}: PageProps):Promise<React.JSX.Element> {
  const acc = await fetchAccountTree();
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
            <Typography variant="h4">New Journal</Typography>
          </Box>
        </Stack>
        <NewJournalFrom data={acc}/>
      </Stack>
    </Box>
  );
}

export default page;
