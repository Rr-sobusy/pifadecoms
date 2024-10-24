import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { fetchMembers } from '@/actions/members/fetch-members';
import { MemberFilters } from '@/components/dashboard/members/members-filter';
import { MembersTable } from '@/components/dashboard/members/members-table';

type PageProps = {
  searchParams: { lastName: string };
};

const Page = async ({ searchParams }: PageProps) => {
  const { lastName } = searchParams;
  const members = await fetchMembers({ lastName });
  console.log(members);
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
            <Typography variant="h4">Members</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained">
              Add
            </Button>
          </Box>
        </Stack>
        <Card>
          <MemberFilters filters={{ lastName }} />
          <Divider />
          <Box sx={{ overflowX: 'auto' }}>
            <MembersTable rows={members} />
          </Box>
          <Divider />
        </Card>
      </Stack>
    </Box>
  );
};

export default Page;
