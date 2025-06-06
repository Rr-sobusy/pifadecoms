'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr/Notepad';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { MembersType } from '@/actions/members/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

// extended interface to inject {id} object
type ExtendedMemberType = MembersType["members"][0] & {
  id?: number;
};

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="body2">
            {row.id}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Number',
    width: '50px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <div>
          <Typography color="inherit" variant="subtitle2">
            {`${row.lastName}, ${row.firstName} ${row.middleName ?? ''}`}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Member Name',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        active: { icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />, title: 'active' },
        inactive: { icon: <MinusIcon color="var(--mui-palette-error-main)" />, title: 'inactive' },
      };

      const { title, icon } = row.accountStatus === 'Active' ? mapping['active'] : mapping['inactive'];
      return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip size="small" variant="outlined" icon={icon} label={title} />
        </Stack>
      );
    },
    name: 'Status',
    width: '100px',
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
            {row.contactNo === null && "rex"}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Contact No.',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => {
      return (
        <>
          <IconButton href={paths.dashboard.members.view(row.memberId)} LinkComponent={RouterLink}>
            <Info />
          </IconButton>
        </>
      );
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<ExtendedMemberType>[];
export interface MembersTableProps {
  rows: ExtendedMemberType[];
}

export function MembersTable({ rows = [] }: MembersTableProps): React.JSX.Element {
  console.log(rows)
  return (
    <React.Fragment>
      <DataTable<ExtendedMemberType> columns={columns} rows={rows} />
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
