'use client';

import React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

type LogExistingPaymentsProps = {
  open: boolean;
};

function LogExistingPayments({ open }: LogExistingPaymentsProps) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '90%', width: '100%' },
      }}
      maxWidth="lg"
      open={open}
    >
      <form>
        <DialogContent>
            
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default LogExistingPayments;
