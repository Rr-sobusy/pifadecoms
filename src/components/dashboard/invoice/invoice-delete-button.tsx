'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { Trash } from '@phosphor-icons/react/dist/ssr';

import { paths } from '@/paths';
import { deleteInvoiceAction } from '@/actions/invoices/delete-invoice-actions';
import { toast } from '@/components/core/toaster';

interface Props {
  invoiceId: bigint;
};

function InvoiceDeleteButton({ invoiceId }: Props) {
  const router = useRouter();

  async function deleteInvoiceHandler() {
    const response = await deleteInvoiceAction(invoiceId);

    if (response?.data?.sucess) {
      router.push(paths.dashboard.invoice.list);
      toast.success('Invoice deleted successfully');
    } else {
      toast.error("Can't delete invoice. Posted journal entries are linked to this invoice.");
    }
  }

  return (
    <Button onClick={deleteInvoiceHandler} variant="text" color="primary" startIcon={<Trash />}>
      Delete Invoice
    </Button>
  );
}

export default InvoiceDeleteButton;
