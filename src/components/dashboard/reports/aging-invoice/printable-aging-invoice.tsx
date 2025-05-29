'use client';

import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Printer as PrinterIcon } from '@phosphor-icons/react/dist/ssr';
import { useReactToPrint } from 'react-to-print';

import type { MembersMap } from '@/actions/invoices/aging-invoice';

import AgingInvoiceTable from './aging-invoice-table';

interface PrintableAgingInvoiceReportProps {
  data: MembersMap;
}

function PrintableAgingInvoiceReport({ data }: PrintableAgingInvoiceReportProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <Stack spacing={2}>
      <Stack direction="row-reverse">
        <Button startIcon={<PrinterIcon />} variant="contained" onClick={() => reactToPrintFn()}>
          Print
        </Button>
      </Stack>
      <AgingInvoiceTable ref={contentRef} data={data} />
    </Stack>
  );
}

export default PrintableAgingInvoiceReport;
