import React from 'react';
import TablePagination from '@mui/material/TablePagination';

interface PaginatorProps  {
  count: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, currentPage: number) => void;
  currentPage: number;
};

function FundTransactionPaginator({ count, handlePageChange, currentPage }: PaginatorProps) {
  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={handlePageChange}
      page={currentPage}
      rowsPerPage={5}
      rowsPerPageOptions={[5]}
    />
  );
}

export default FundTransactionPaginator;
