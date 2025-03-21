import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';

interface Props {
  anchorEl: null | Element | HTMLButtonElement;
  onClose?: () => void;
  open?: boolean;
  nonPostingHandler: () => void;
  withPostingHandler: () => void;
}

function DepositButtonPopover({ anchorEl, onClose, open = false , nonPostingHandler, withPostingHandler}: Props) {
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
      <Stack sx={{ p: 2 }}>
        <Button onClick={withPostingHandler} variant="text">New posting</Button>
        <Button onClick={nonPostingHandler} variant="text">Existing posting</Button>
      </Stack>
    </Popover>
  );
}

export default DepositButtonPopover;
