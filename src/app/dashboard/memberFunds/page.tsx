import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { fetchMemberFunds } from '@/actions/funds/fetch-funds';
import FundsStats from '@/components/dashboard/funds/fund-stats';
import { MemberFundsTable } from '@/components/dashboard/funds/member-funds-table';


async function page(): Promise<React.JSX.Element> {
  const [memberFunds] = await Promise.all([fetchMemberFunds()]);

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
            <Typography variant="h4">Member Funds</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained">
              Add Member Funds
            </Button>
          </Box>
        </Stack>
        <FundsStats />
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <MemberFundsTable rows={memberFunds} />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

export default page;
