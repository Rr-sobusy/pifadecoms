import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fetchExpenses } from '@/actions/expenses/fetch-expenses';
import ExpenseTable from '@/components/dashboard/expenses/expense-table';

export const metadata: Metadata = {
  title: 'PIFADECO | Expenses',
};

type PageProps = {};

async function page({}: PageProps): Promise<React.JSX.Element> {
  const rex = await fetchExpenses();
  console.log(rex);
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
            <Typography variant="h4">Expenses</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">Record Expense</Button>
          </Box>
        </Stack>
        <ExpenseTable rows={rex} />
      </Stack>
    </Box>
  );
}

export default page;
