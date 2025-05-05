'use client';

/**
 * * Delete loan component
 */
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { DotsThreeVertical as OptionIcon } from '@phosphor-icons/react/dist/ssr';

import { paths } from '@/paths';
import { deleteLoanAction } from '@/actions/loans/delete-loan';
import { usePopover } from '@/hooks/use-popover';
import { toast } from '@/components/core/toaster';

import OptionsPopover from './options-popover';

function OptionsPopoverButton({ isAdmin, loanId }: { isAdmin: boolean; loanId: bigint }) {
  const popover = usePopover<HTMLButtonElement>();
  const router = useRouter();

  async function deleteLoanHandler() {
    const result = await deleteLoanAction(Number(loanId));

    if (result?.data?.success) {
      toast.success('Loan deleted successfully.');
      router.push(paths.dashboard.loans.list);
    }
  }
  return (
    <>
      <Button ref={popover.anchorRef} onClick={popover.handleOpen} startIcon={<OptionIcon />} variant="text">
        Options
      </Button>
      <OptionsPopover
        deleteHandler={deleteLoanHandler}
        anchorEl={popover.anchorRef.current}
        open={popover.open}
        onClose={popover.handleClose}
        isAdmin={isAdmin}
      />
    </>
  );
}

export default OptionsPopoverButton;
