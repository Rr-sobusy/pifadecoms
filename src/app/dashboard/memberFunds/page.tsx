import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { computeMonthlyBalances } from '@/lib/api-utils/calculate-balance-every-14th';
import { fetchAggregatedFunds } from '@/actions/funds/fetch-aggregated-funds';
import { fetchMemberFunds } from '@/actions/funds/fetch-funds';
import { membersStillNotRegistered } from '@/actions/funds/fetch-members-nofund';
import AddFundsMember from '@/components/dashboard/funds/add-member';
import FundsStats from '@/components/dashboard/funds/fund-stats';
import { MemberFundsTable } from '@/components/dashboard/funds/member-funds-table';
import { MemberFilters } from '@/components/dashboard/members/members-filter';
import TotalSavingsInterestCard from '@/components/dashboard/funds/total-savings-interest-card';

interface PageProps {
  searchParams: { addNewFund: boolean; memberName: string };
}

export const metadata: Metadata = {
  title: 'PIFADECO | Member funds',
};

const fiscalYear = 2025;
const interestRate = 2;

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { memberName } = searchParams;

  const [memberFunds, membersList, aggregatedFunds] = await Promise.all([
    fetchMemberFunds(memberName),
    membersStillNotRegistered(),
    fetchAggregatedFunds(),
  ]);
  let totalSavingsInterestPayable = 0;
  memberFunds.map((fund) => {
    const monthlyBalances = computeMonthlyBalances(fund, fiscalYear, 'Savings');
    const interestPerMember = monthlyBalances.reduce((curr, acc) => curr + acc.balance, 0) * interestRate / 1200;
    totalSavingsInterestPayable += interestPerMember;
    
  });

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
          <MemberFilters basePath={paths.dashboard.funds.list} filters={{ memberName }} />
          <Divider />
          <Box sx={{ overflowX: 'auto' }}>
            <MemberFundsTable rows={memberFunds} />
          </Box>
        </Card>
        <TotalSavingsInterestCard interestRate={interestRate} fiscalYear={fiscalYear} totalSavingsInterestPayable={totalSavingsInterestPayable} />
      </Stack>
      <AddFundsMember
        membersList={membersList.map((member) => {
          return {
            memberId: member.memberId,
            lastName: member.lastName,
            firstName: member.firstName,
            middleName: member.middleName ?? '',
          };
        })}
        open={Boolean(searchParams.addNewFund)}
      />
    </Box>
  );
}

export default page;
