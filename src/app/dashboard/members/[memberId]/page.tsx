import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';

import { paths } from '@/paths';
import { fetchMemberData } from '@/actions/members/fetch-members';
import { fetchMemberPatronages } from '@/actions/reports/patronages';
import BasicDetailsCard from '@/components/dashboard/members/basic-details-card';
import NotfoundToaster from '@/components/dashboard/members/member-not-found';
import MemberStatusToggler from '@/components/dashboard/members/member-status-toggler';
import PatronageTable from '@/components/dashboard/members/patronage-table';
import PatronageYearPicker from '@/components/dashboard/members/patronage-year-picker';

export const metadata = { title: "PIFADECO || Member Profile" } satisfies Metadata;

interface PageProps {
  params: { memberId: string };
  searchParams: { monthFilter: string; filterYear: string };
}

export default async function Page({ params, searchParams }: PageProps): Promise<React.JSX.Element> {
  const { memberId } = params;

  const memberData = await fetchMemberData(memberId);
  const patronages = await fetchMemberPatronages({
    memberId,
    month: searchParams.monthFilter,
    year: searchParams.filterYear,
  });

  const isActive = memberData?.accountStatus === 'Active';

  if (!memberData) {
    return <NotfoundToaster errorMessage="Member Not Found redirecting..." routeLink={paths.dashboard.members.list} />;
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
        <Stack spacing={3}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.members.list}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Members
            </Link>
          </div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <div>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="h4">{`${memberData?.lastName}, ${memberData?.firstName}`}</Typography>
                  <Chip
                    icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                    label="Active"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" variant="body1">
                  {memberData?.address}
                </Typography>
              </div>
            </Stack>
            <div>
              <Button endIcon={<CaretDownIcon />} variant="contained">
                Action
              </Button>
            </div>
          </Stack>
        </Stack>
        <Grid container spacing={4}>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <Stack spacing={4}>
              <BasicDetailsCard memberData={memberData} />
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <ShieldWarningIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Security"
                />
                <CardContent>
                  <Stack spacing={1}>
                    <div>
                      <Button color="error" variant="contained">
                        Delete account
                      </Button>
                    </div>
                    <Typography>or</Typography>
                    <MemberStatusToggler memberId={memberData?.memberId} isActive={isActive} />
                    <Typography color="text.secondary" variant="body2">
                      Toggle membership status whether he/she is active or inactive.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <Stack spacing={4}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <CreditCardIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Member Patronages"
                />
                <CardContent>
                  <PatronageYearPicker />
                  <PatronageTable
                    rows={patronages}
                    content={[
                      { month: 'All', value: 0 },
                      { month: 'Jan', value: 1 },
                      { month: 'Feb', value: 2 },
                      { month: 'Mar', value: 3 },
                      { month: 'Apr', value: 4 },
                      { month: 'May', value: 5 },
                      { month: 'Jun', value: 6 },
                      { month: 'Jul', value: 7 },
                      { month: 'Aug', value: 8 },
                      { month: 'Sep', value: 9 },
                      { month: 'Oct', value: 10 },
                      { month: 'Nov', value: 11 },
                      { month: 'Dec', value: 12 },
                    ]}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
