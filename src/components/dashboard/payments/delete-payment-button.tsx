import React from 'react';
import Button from '@mui/material/Button';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr';
import { useAction } from 'next-safe-action/hooks';

import { deletePaymentAction } from '@/actions/invoice-payments/delete-payment';
import type { PaymentsType } from '@/actions/invoice-payments/types';

interface PageProps {
  paymentIds: PaymentsType[0]['itemsPaymentId'][];
}

function DeletePaymentButton({ paymentIds }: PageProps) {
  const { execute } = useAction(deletePaymentAction);
  return (
    <Button onClick={() => execute(paymentIds)} variant="contained" color="error" startIcon={<DeleteIcon />}>
      Delete Payment
    </Button>
  );
}

export default DeletePaymentButton;
