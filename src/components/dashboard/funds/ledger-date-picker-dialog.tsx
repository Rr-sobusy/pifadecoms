'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { dayjs } from '@/lib/dayjs';

const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

interface LedgerDatePickerDialogProps {
  isOpen: boolean;
}

function LedgerDatePickerDialog({ isOpen = true }: LedgerDatePickerDialogProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { control, handleSubmit } = useForm<z.infer<typeof dateRangeSchema>>({
    resolver: zodResolver(dateRangeSchema),
  });

  function handleClose() {
    router.push(pathname, { scroll: false });
  }

  function submitHandler(data: z.infer<typeof dateRangeSchema>) {
    const urlParams = new URLSearchParams();

    if (data.startDate) {
      urlParams.set('startDate', dayjs(data.startDate).format('YYYY-MM-DD'));
    }

    if (data.endDate) {
      urlParams.set('endDate', dayjs(data.endDate).format('YYYY-MM-DD'));
    }

    router.push(`?${urlParams.toString()}`)
  }

  return (
    <Dialog
      maxWidth="sm"
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { height: '30%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6"> Fiscal Period</Typography>
              <Typography color="" variant="caption">
                Select date to run report
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={2}>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  label="Start date"
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.toDate())}
                />
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  label="End date"
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.toDate())}
                />
              )}
            />
          </Stack>
          <Stack direction="row-reverse">
            <Button variant="contained" type="submit">
              Filter
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default LedgerDatePickerDialog;
