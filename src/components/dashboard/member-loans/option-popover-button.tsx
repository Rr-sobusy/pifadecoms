'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { DotsThreeVertical as OptionIcon } from '@phosphor-icons/react/dist/ssr';

import { usePopover } from '@/hooks/use-popover';

import OptionsPopover from './options-popover';

function OptionsPopoverButton() {
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Button ref={popover.anchorRef} onClick={popover.handleOpen} startIcon={<OptionIcon />} variant="text">
        Options
      </Button>
      <OptionsPopover anchorEl={popover.anchorRef.current} open={popover.open} onClose={popover.handleClose} />
    </>
  );
}

export default OptionsPopoverButton;
