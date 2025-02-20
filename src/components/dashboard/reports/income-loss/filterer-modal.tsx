'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Input } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { Funnel } from '@phosphor-icons/react/dist/ssr/Funnel';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { JournalType } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { dayjs } from '@/lib/dayjs';

const filterSchema = zod.object({
  startDate: zod.date().optional(),
  endDate: zod.date().optional(),
});

type FiltererProps = {
  open: boolean;
};

function IncomeAndLossFiltererModal({ open }: FiltererProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { control, handleSubmit } = useForm<zod.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: zod.infer<typeof filterSchema>) {
    const urlSearchParams = new URLSearchParams();

    if (data.startDate && data.endDate) {
      urlSearchParams.append('startDate', data.startDate.toISOString());
      urlSearchParams.append('endDate', data.endDate.toISOString());
    }

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '40%', width: '100%' },
      }}
      open={open}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
          >
            <Stack>
              <Typography variant="h6">Filter results</Typography>
              <Typography color="text.secondary" variant="caption">
                Filter income and losses by date range.
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel htmlFor="startDate">Start Date</InputLabel>
                    <DatePicker
                      {...field}
                      value={dayjs(field.value)}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel htmlFor="endDate">End Date</InputLabel>
                    <DatePicker
                      {...field}
                      value={dayjs(field.value)}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Stack paddingY={2} alignItems="flex-end">
            <div>
              <Button startIcon={<Funnel />} type="submit" variant="contained">
                Filter Result
              </Button>
            </div>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default IncomeAndLossFiltererModal;
