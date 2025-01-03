'use client';

import React from 'react';
import Button from '@mui/material/Button';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';

import { usePopover } from '@/hooks/use-popover';

import DateRangePopover from './date-range-popover';


function DateRangeBtn() {
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Button ref={popover.anchorRef} onClick={popover.handleOpen} startIcon={<FilterIcon />} variant="outlined">
        Filter by Date range
      </Button>
      <DateRangePopover anchorEl={popover.anchorRef.current} open={popover.open} onClose={popover.handleClose} />
    </>
  );
}

export default DateRangeBtn;
