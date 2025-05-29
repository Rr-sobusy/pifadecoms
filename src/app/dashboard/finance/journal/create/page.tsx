import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fetchAccountTree} from '@/actions/accounts/fetch-accounts';
import NewJournalFrom from '@/components/dashboard/finance/new-journal-form';
import type { Metadata } from 'next';

export const metadata:Metadata = {
  title : "Finance || New Journal Entry"
}


async function page():Promise<React.JSX.Element> {
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
