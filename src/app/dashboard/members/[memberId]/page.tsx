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
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { fetchMemberData } from '@/actions/members/fetch-members';
import { fetchMemberPatronages } from '@/actions/reports/patronages';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { Notifications } from '@/components/dashboard/customer/notifications';
import type { Address } from '@/components/dashboard/customer/shipping-address';
import { ShippingAddress } from '@/components/dashboard/customer/shipping-address';
import NotfoundToaster from '@/components/dashboard/members/member-not-found';
import { MemberPatronagesTab } from '@/components/dashboard/members/member-patronage-tab';
import PatronageTable from '@/components/dashboard/members/patronage-table';

export const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

interface PageProps {
  params: { memberId: string };
  searchParams: { monthFilter: string };
}

export default async function Page({ params, searchParams }: PageProps): Promise<React.JSX.Element> {
  const { memberId } = params;

  const memberData = await fetchMemberData(memberId);
  const patronages = await fetchMemberPatronages({ memberId, month: '3' });

  console.log(patronages);

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
              Members {searchParams.monthFilter}
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
              <Card>
                <CardHeader
                  action={
                    <IconButton>
                      <PencilSimpleIcon />
                    </IconButton>
                  }
                  avatar={
                    <Avatar>
                      <UserIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Basic details"
                />
                <PropertyList
                  divider={<Divider />}
                  orientation="vertical"
                  sx={{ '--PropertyItem-padding': '12px 24px' }}
                >
                  {(
                    [
                      { key: 'Customer ID', value: <Chip label={memberData?.memberId} size="small" variant="soft" /> },
                      { key: 'Name', value: `${memberData?.lastName}, ${memberData?.firstName}` },
                      { key: 'Birth Date', value: dayjs(memberData?.birthDate).format('MMM DD YYYY') },
                      { key: 'Phone', value: memberData?.contactNo ?? 'N/A' },
                      { key: 'Occupation', value: memberData?.occupation },
                      { key: 'Date Accepted', value: dayjs(memberData?.dateAccepted).format('MM DD YYYY') },
                      { key: 'TIN', value: memberData?.tin ?? 'N/A' },
                      { key: 'Civil Status', value: memberData?.civilStatus },
                      { key: 'Highest Education Attainment', value: memberData?.highestEdAttain },
                      {
                        key: 'Annual Income',
                        value:
                          memberData?.annualIncom ?? formatToCurrency(memberData.annualIncom ?? 0, 'Fil-ph', 'Php'),
                      },
                    ] satisfies { key: string; value: React.ReactNode }[]
                  ).map(
                    (item): React.JSX.Element => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    )
                  )}
                </PropertyList>
              </Card>
              {/* <Card>
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
                    <Typography color="text.secondary" variant="body2">
                      A deleted customer cannot be restored. All data will be permanently removed.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card> */}
            </Stack>
          </Grid>
          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <Stack spacing={4}>
              {/* <Balances invoiceBalance={memberData?.invoice as NonNullableInvoice[]} /> */}

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
                  <Card sx={{ borderRadius: 1 }} variant="outlined">
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
                  </Card>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader
                  action={
                    <Button color="secondary" startIcon={<PlusIcon />}>
                      Add
                    </Button>
                  }
                  avatar={
                    <Avatar>
                      <HouseIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Shipping addresses"
                />
                <CardContent>
                  <Grid container spacing={3}>
                    {(
                      [
                        {
                          id: 'ADR-001',
                          country: 'United States',
                          state: 'Michigan',
                          city: 'Lansing',
                          zipCode: '48933',
                          street: '480 Haven Lane',
                          primary: true,
                        },
                        {
                          id: 'ADR-002',
                          country: 'United States',
                          state: 'Missouri',
                          city: 'Springfield',
                          zipCode: '65804',
                          street: '4807 Lighthouse Drive',
                        },
                      ] satisfies Address[]
                    ).map((address) => (
                      <Grid
                        key={address.id}
                        size={{
                          md: 6,
                          xs: 12,
                        }}
                      >
                        <ShippingAddress address={address} />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card> */}
              {/* <Notifications
                notifications={[
                  {
                    id: 'EV-002',
                    type: 'Refund request approved',
                    status: 'pending',
                    createdAt: dayjs().subtract(34, 'minute').subtract(5, 'hour').subtract(3, 'day').toDate(),
                  },
                  {
                    id: 'EV-001',
                    type: 'Order confirmation',
                    status: 'delivered',
                    createdAt: dayjs().subtract(49, 'minute').subtract(11, 'hour').subtract(4, 'day').toDate(),
                  },
                ]}
              /> */}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
