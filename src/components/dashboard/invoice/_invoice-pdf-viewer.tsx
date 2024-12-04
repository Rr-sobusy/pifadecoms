'use client';

import * as React from 'react';
import { type SingleInvoiceType } from '@/actions/invoices/types';
import { PDFViewer } from '@/components/core/pdf-viewer';

import { InvoiceDoc } from './_invoice.doc';

export function InvoicePDFDoc({ invoice }: { invoice: SingleInvoiceType  | undefined}): React.JSX.Element {
  return (
    <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
      <InvoiceDoc invoice={invoice} />
    </PDFViewer>
  );
}
