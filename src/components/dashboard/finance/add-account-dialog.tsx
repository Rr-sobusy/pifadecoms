'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

interface AddAccountProps {
  open: boolean;
  accountType: { key: number; name: string }[];
}

export const AddNewAccountDiaglog = ({ open, accountType }: AddAccountProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.push(paths.dashboard.finance.list);
  };
  return (
    <Dialog
      maxWidth="xs"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
        >
          <Stack>
            <Typography variant="h6">Create new account</Typography>
            <Typography color="" variant="caption">
              Create account based to its financial category
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack marginTop={6} direction="column">
          rex
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
