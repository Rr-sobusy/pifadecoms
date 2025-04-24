'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { FunnelSimple, X } from '@phosphor-icons/react/dist/ssr';
import { Printer } from '@phosphor-icons/react/dist/ssr/Printer';
import { useReactToPrint } from 'react-to-print';

import { paths } from '@/paths';
import { IncomeAndLossTypes } from '@/actions/reports/types';

import IncomeAndLossTable from './income-table';

interface Props {
  incomeAndLoss: IncomeAndLossTypes;
  searchParams: { startDate?: Date | string; endDate?: Date | string; isFilterOpen: boolean };
}

function PrintableIncomeStatement({ incomeAndLoss, searchParams }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const isSearchParamsEmpty = !searchParams || Object.keys(searchParams).length === 0;
  return (
    <>
      <Stack spacing={1} flexDirection="row-reverse">
        <Button onClick={() => reactToPrintFn()} startIcon={<Printer />} variant="text">
          Print
        </Button>
        {!isSearchParamsEmpty ? (
          <Button
            startIcon={<X />}
            LinkComponent={Link}
            href={paths.dashboard.reports.incomeAndLoss}
            color="error"
            variant="text"
          >
            Clear filters
          </Button>
        ) : (
          <Button
            LinkComponent={Link}
            href={`${paths.dashboard.reports.incomeAndLoss}?isFilterOpen=true`}
            startIcon={<FunnelSimple />}
            variant="text"
          >
            Filter by date range
          </Button>
        )}
      </Stack>
      <Card sx={{ marginTop: 3 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <IncomeAndLossTable searchParams={searchParams} ref={contentRef} balances={incomeAndLoss} />
        </Box>
      </Card>
    </>
  );
}

export default PrintableIncomeStatement;
