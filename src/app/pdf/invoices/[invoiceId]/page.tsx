'use client';

import * as React from 'react';

import { SingleInvoiceType } from '@/actions/invoices/types';
import { InvoicePDFDoc } from '@/components/dashboard/invoice/_invoice-pdf-viewer';

export default function Page({params}:{params: {invoiceId: number}}) {
  const [state, setState] = React.useState<SingleInvoiceType | undefined>();

  React.useEffect(() => {
    async function fetchInvoiceData() {
      try {
        const invoiceData: SingleInvoiceType = await fetch(`/dashboard/invoice/api/${params.invoiceId}`, {
          method: 'GET',
        }).then((res) => res.json());
        setState(invoiceData);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    }
    fetchInvoiceData();
  }, []);

  return <InvoicePDFDoc invoice={state} />
}
