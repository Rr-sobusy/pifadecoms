'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Stack } from '@mui/system';
import { CalendarDots } from '@phosphor-icons/react/dist/ssr';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { useReactToPrint } from 'react-to-print';

import { paths } from '@/paths';
import { BalanceSheetTypes } from '@/actions/reports/types';

import BalanceTable from './balance-table';

interface Props {
  balances: BalanceSheetTypes;
}

function PrintableBalanceSheet({ balances }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <Stack spacing={1} flexDirection="row-reverse">
        <Button onClick={() => reactToPrintFn()} startIcon={<ExportIcon />} variant="text">
          Print
        </Button>
        <Button
          LinkComponent={Link}
          href={`${paths.dashboard.reports.balanceSheet}?filterList=true`}
          startIcon={<CalendarDots />}
          variant="text"
        >
          Select target date
        </Button>
      </Stack>
      <Card sx={{ marginTop: 3 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <BalanceTable ref={contentRef} balances={balances} />
        </Box>
      </Card>
    </>
  );
}

export default PrintableBalanceSheet;
