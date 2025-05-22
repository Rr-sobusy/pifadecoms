import React from 'react';
import IconButton from '@mui/material/IconButton';
import { TrashSimple as TrashIcon } from '@phosphor-icons/react/dist/ssr';

import { deleteInvoiceItemAction } from '@/actions/invoices/delete-invoice-item-action';
import { toast } from '@/components/core/toaster';

interface Props {
  invoiceItemId: bigint;
}

function DeleteInvoiceItemButton({ invoiceItemId }: Props) {
  async function deleteInvoiceItemHandler() {
    const actionResult = await deleteInvoiceItemAction(invoiceItemId);

    if (actionResult?.data?.success) {
      toast.success('Invoice item deleted');
    } else {
      toast.error('Error in deleting. Payment associated with this item may not be deleted.');
    }
  }

  return (
    <IconButton onClick={deleteInvoiceItemHandler}>
      <TrashIcon size={25} color="red" />
    </IconButton>
  );
}

export default DeleteInvoiceItemButton;
