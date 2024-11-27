'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TablePagination from '@mui/material/TablePagination';

import { paths } from '@/paths';

interface MembersPaginationProps  {
  count?: number;
  offsetPage?: number;
};

const MembersPagination = ({ count = 0, offsetPage = 1 }: MembersPaginationProps): React.JSX.Element => {
  const router = useRouter();

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) => {
    const updatedPage = pageNumber + 1;

    const urlParams = new URLSearchParams();

    urlParams.set('offsetPage', String(updatedPage));

    router.push(`${paths.dashboard.members.list}?${urlParams.toString()}`);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={handleChangePage}
      page={offsetPage - 1}
      rowsPerPage={100}
      rowsPerPageOptions={[100]}
    />
  );
};

export default MembersPagination;
