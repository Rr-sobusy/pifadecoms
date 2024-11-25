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
import { Notepad as Info } from '@phosphor-icons/react/dist/ssr/Notepad';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { MemberFundsType } from '@/actions/funds/types';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

type MemberFundsTableProps = {
  rows?: MemberFundsType;
};

const columns = [
  {
    formatter: (row) => <div>{`${row.Member.lastName}, ${row.Member.firstName}`}</div>,
    name: 'Member Name',
    width: '250px',
  },
  {
    formatter: (row) => <div>{dayjs(row.createdAt).format('MMM DD YYYY')}</div>,
    name: 'Date Created',
    width: '100px',
  },
  {
    formatter: (row) => <div>{formatToCurrency(row.shareCapBal, 'Fil-ph', 'Php')}</div>,
    name: 'Share Capital (CBU)',
    width: '150px',
  },
  {
    formatter: (row) => <div>{formatToCurrency(row.savingsBal, 'Fil-ph', 'Php')}</div>,
    name: 'Member Savings',
    width: '150px',
  },
  {
    formatter: (row) => <div>{dayjs(row.updatedAt).format('MMM DD YYYY')}</div>,
    name: 'Last Transaction',
    width: '100px',
  },
  {
    formatter: (row) => (
      <IconButton LinkComponent={RouterLink} href={paths.dashboard.funds.view(row.fundId)}>
        <Info />
      </IconButton>
    ),
    name: 'Action',
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<MemberFundsType[0]>[];

// const columns = [
//   {
//     formatter: (row, index): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {row.id}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Number',
//     width: '50px',
//   },
//   {
//     formatter: (row, index): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="subtitle2">
//             {row.lastName + ', ' + row.firstName}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Member Name',
//     width: '250px',
//   },
//   {
//     formatter: (row): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {row.gender}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Gender',
//     width: '50px',
//   },
//   {
//     formatter: (row): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {dayjs(row.birthDate).format('MMM DD YYYY')}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Birth Date',
//     width: '150px',
//   },
//   {
//     formatter: (row): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {row.address}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Address',
//     width: '200px',
//   },
//   {
//     formatter: (row): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {row.occupation}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Occupation',
//     width: '150px',
//   },
//   {
//     formatter: (row): React.JSX.Element => (
//       <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//         <div>
//           <Typography color="inherit" variant="body2">
//             {row.contactNo}
//           </Typography>
//         </div>
//       </Stack>
//     ),
//     name: 'Contact No.',
//     width: '100px',
//   },
//   {
//     formatter: (row): React.JSX.Element => {
//       return (
//         <>
//           <IconButton href={paths.dashboard.members.view(row.memberId)} LinkComponent={RouterLink}>
//             <Info />
//           </IconButton>
//         </>
//       );
//     },
//     name: 'Actions',
//     hideName: true,
//     width: '100px',
//     align: 'right',
//   },
// ] satisfies ColumnDef<ExtendedMemberType>[];
// export interface MembersTableProps {
//   rows: ExtendedMemberType[];
// }

export function MemberFundsTable({ rows = [] }: MemberFundsTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No fund savings record found.
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
