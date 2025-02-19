'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider } from '@mui/material';
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
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { JournalType } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

type FilterDialogProps = {
  open: boolean;
};

const journalMap: Record<JournalType | 'All', string> = {
  All: 'All',
  cashReceipts: 'Cash Receipts',
  cashDisbursement: 'Cash Disbursement',
  generalJournal: 'General Journal',
};

const filterSchema = zod.object({
  journalType: zod.enum(['All', 'cashReceipts', 'cashDisbursement', 'generalJournal']).optional(),
  dateRange: zod
    .object({
      startDate: zod.date(),
      endDate: zod.date(),
    })
    .optional(),
});

function LedgerFilterModal({ open }: FilterDialogProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<zod.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: zod.infer<typeof filterSchema>) {
    const urlSearchParams = new URLSearchParams();

    if (data.journalType) {
      urlSearchParams.set('journalType', data.journalType);
    }

    if (data.dateRange?.startDate && data.dateRange?.endDate) {
      urlSearchParams.set('startDate', dayjs(data.dateRange.startDate).format('YYYY-MM-DD'));
      urlSearchParams.set('endDate', dayjs(data.dateRange.endDate).format('YYYY-MM-DD'));
    }

    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '50%', width: '100%' },
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
                Filter the ledger list based on date range and journal type.
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="journalType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Journal Type</InputLabel>
                    <Select {...field} fullWidth>
                      {Object.entries(journalMap).map(([key, value]) => (
                        <Option key={key} value={key}>
                          {journalMap[key as JournalType & 'All']}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="dateRange.startDate"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>Start Date</InputLabel>
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      value={dayjs(field.value)}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="dateRange.endDate"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>End Date</InputLabel>
                    <DatePicker
                      {...field}
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      value={dayjs(field.value)}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <div>
            <Button type="submit" variant="contained">
              Filter Result
            </Button>
          </div>
          <div>
            <Button onClick={() => console.log(errors)} variant="contained">
              Debug
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default LedgerFilterModal;
