'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

type AddFundsMemberProps = {
  open?: boolean;
};

function AddFundsMember({ open = true }: AddFundsMemberProps) {
  const pathName = usePathname();
  const router = useRouter();

  function handleClose() {
    router.push(pathName);
  }
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <form>
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">Add New Member to Fund</Typography>
              <Typography color="" variant="caption">Create record for member savings and share</Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddFundsMember;
