import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { Check, Repeat } from '@phosphor-icons/react/dist/ssr';

interface OptionPopoverProps {
  anchorEl: null | Element | HTMLButtonElement;
  onClose?: () => void;
  onMarkAllAsRead?: () => void;
  onRemoveOne?: (id: string) => void;
  open?: boolean;
}

function OptionsPopover({ anchorEl, onClose, open = false }: OptionPopoverProps) {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { maxWidth: '750px' } } }}
      marginThreshold={2}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Stack padding={1} spacing={1}>
        <Button sx={{ color: 'text.primary' }} startIcon={<Check />}>
          Mark as paid
        </Button>
        <Button sx={{ color: 'text.primary' }} startIcon={<Repeat />}>
          Loan renewal
        </Button>
      </Stack>
    </Popover>
  );
}

export default OptionsPopover;
