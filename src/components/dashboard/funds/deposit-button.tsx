'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { PiggyBank } from '@phosphor-icons/react/dist/ssr';

import { usePopover } from '@/hooks/use-popover';

import DepositButtonPopover from './deposit-button-popover';

interface Props {
  nonPostingHandler: () => void;
  withPostingHandler: () => void;
}

function DepositButton({ nonPostingHandler, withPostingHandler }: Props) {
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Button ref={popover.anchorRef} onClick={popover.handleOpen} startIcon={<PiggyBank />} variant="contained">
        Deposit
      </Button>
      <DepositButtonPopover
        nonPostingHandler={nonPostingHandler}
        withPostingHandler={withPostingHandler}
        anchorEl={popover.anchorRef.current}
        open={popover.open}
        onClose={popover.handleClose}
      />
    </>
  );
}

export default DepositButton;
