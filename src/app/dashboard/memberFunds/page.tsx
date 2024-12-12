import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { fetchAggregatedFunds } from '@/actions/funds/fetch-aggregated-funds';
import { fetchMemberFunds } from '@/actions/funds/fetch-funds';
import { membersStillNotRegistered } from '@/actions/funds/fetch-members-nofund';
import AddFundsMember from '@/components/dashboard/funds/add-member';
import FundsStats from '@/components/dashboard/funds/fund-stats';
import { MemberFundsTable } from '@/components/dashboard/funds/member-funds-table';

interface PageProps {
  searchParams: { addNewFund: boolean };
}
async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const [memberFunds, membersList, aggregatedFunds] = await Promise.all([
    fetchMemberFunds(),
    membersStillNotRegistered(),
    fetchAggregatedFunds(),
  ]);

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
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.funds.list}?addNewFund=true`}
              startIcon={<PlusIcon />}
              variant="contained"
            >
              Add Member
            </Button>
          </Box>
        </Stack>
        <FundsStats aggregatedFunds={aggregatedFunds} />
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <MemberFundsTable rows={memberFunds} />
          </Box>
        </Card>
      </Stack>
      <AddFundsMember
        membersList={membersList.map((member) => {
          return {
            memberId: member.memberId,
            lastName: member.lastName,
            firstName: member.firstName,
          };
        })}
        open={Boolean(searchParams.addNewFund)}
      />
    </Box>
  );
}

export default page;
