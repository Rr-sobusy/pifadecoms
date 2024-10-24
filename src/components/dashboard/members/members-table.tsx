'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { MembersType } from '@/actions/members/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row, index): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {index + 1}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Number',
    width: '50px',
  },
  {
    formatter: (row, index): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="subtitle2">
            {row.lastName + ', ' + row.firstName}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Member Name',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.gender}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Gender',
    width: '50px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {dayjs(row.birthDate).format('MMM DD YYYY')}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Birth Date',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.address}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Address',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.occupation}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Occupation',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.contactNo}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Contact No.',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <PencilSimpleIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<MembersType[0]>[];
export interface MembersTableProps {
  rows: MembersType;
}

export function MembersTable({ rows }: MembersTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable<MembersType[0]> columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No members found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
