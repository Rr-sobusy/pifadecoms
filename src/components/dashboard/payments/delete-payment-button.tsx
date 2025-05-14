import React from 'react';
import Button from '@mui/material/Button';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr';
import { useAction } from 'next-safe-action/hooks';

import { deletePaymentAction } from '@/actions/invoice-payments/delete-payment';
import type { PaymentsType } from '@/actions/invoice-payments/types';
import { toast } from '@/components/core/toaster';

interface PageProps {
  paymentIds: PaymentsType['payment'][0]['itemsPaymentId'][];
}

function DeletePaymentButton({ paymentIds }: PageProps) {
  const { execute, isExecuting, result } = useAction(deletePaymentAction);

  React.useEffect(() => {
    if (result.data?.success) {
      toast.success(
        'Sales payment deleted successfully. You can delete in account transaction to reverse account balances.'
      );
    }
  }, [result]);

  return (
    <Button
      disabled={isExecuting || paymentIds.length < 1}
      onClick={() => execute(paymentIds)}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
    >
      Delete Payment
    </Button>
  );
}

export default DeletePaymentButton;
