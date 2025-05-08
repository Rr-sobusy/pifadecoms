'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { dayjs } from '@/lib/dayjs';

interface FilterPeriodProps {
  isDialogOpen: boolean;
}

const filterSchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
  })
  .superRefine((value, ctx) => {
    if ((value.startDate || dayjs()) > (value.endDate || dayjs())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date cant be greater than end date.',
      });
    }

    return;
  });

function FilterPeriod({ isDialogOpen = false }: FilterPeriodProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: z.infer<typeof filterSchema>) {
    const urlParams = new URLSearchParams();

    if (data.startDate && data.endDate) {
      urlParams.set('startDate', dayjs(data.startDate).format('YYYY-MM-DD'));
      urlParams.set('endDate', dayjs(data.endDate).format('YYYY-MM-DD'));
    } else {
      return;
    }

    router.push(`?${urlParams.toString()}`);
  }

  return (
    <Dialog
      maxWidth="md"
      keepMounted
      disableScrollLock
      open={isDialogOpen}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '60%', width: '100%' },
      }}
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
                Filter the data table based on filter inputs
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
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(date) => field.onChange(date?.toDate())}
                  label="Fiscal Start Period"
                />
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(date) => field.onChange(date?.toDate())}
                  label="Fiscal End Period"
                />
              )}
            />
          </Stack>
          {errors && (
            <Stack>
              <Typography color="error">{errors.startDate?.message}</Typography>
              <Typography color="error">{errors.endDate?.message}</Typography>
            </Stack>
          )}
          <Stack direction="row-reverse">
            <Button startIcon={<FilterIcon />} variant="contained" type="submit">
              Filter
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FilterPeriod;
