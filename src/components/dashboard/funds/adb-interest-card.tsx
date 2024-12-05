'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import  Divider  from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { calculateADB } from '@/lib/api-utils/calculate-adb';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { MemberFundsType } from '@/actions/funds/types';

type Props = {
  fund: MemberFundsType[0];
  open: boolean;
};

const adbComponentsSchema = zod.object({
  startDate: zod.date(),
  endDate: zod.date(),
  interestRate: zod.number(),
});

type IAdbSchema = zod.infer<typeof adbComponentsSchema>;

function AdbCalculator({ fund, open }: Props) {
  const pathName = usePathname();
  const router = useRouter();

  const {
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdbSchema>({
    resolver: zodResolver(adbComponentsSchema),
  });

  const savingsTransactions = fund.Transactions.filter((transaction) => transaction.fundType === 'Savings');

  function handleClose() {
    router.push(pathName);
  }

  function submitHandler(data: IAdbSchema) {
    console.log(data);
  }

  const currentAdb = calculateADB(
    savingsTransactions.sort((a, b) => a.fundTransactId - b.fundTransactId),
    dayjs(getValues('startDate')),
    dayjs(getValues('endDate')),
    fund.savingsBal
  );

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { height: '60%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">ADB and Interest Payables</Typography>
              <Typography color="" variant="caption">
                Compute the Average Daily Balance based on movement of savings fund subject to date
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack marginTop={4} spacing={2}>
            <Grid container spacing={2}>
              <Grid
                size={{
                  xl: 4,
                  md: 12,
                }}
              >
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.startDate),
                          fullWidth: true,
                          helperText: errors.startDate?.message,
                        },
                      }}
                      value={dayjs(field.value)}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      label="Start Date"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid
                size={{
                  xl: 4,
                  md: 12,
                }}
              >
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.endDate),
                          fullWidth: true,
                          helperText: errors.endDate?.message,
                        },
                      }}
                      value={dayjs(field.value)}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      label="End Date"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid
                size={{
                  xl: 4,
                  md: 12,
                }}
              >
                <Controller
                  control={control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.interestRate)} fullWidth>
                      <InputLabel required>Interest Rate (Per annum)</InputLabel>
                      <OutlinedInput
                        {...field}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                        type="number"
                      />
                      {errors.interestRate && <FormHelperText>{errors.interestRate.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ sm: 12 }}>
                <Button type="submit" fullWidth variant="contained">
                  Compute
                </Button>
              </Grid>
            </Grid>
            <Card>
              <CardContent>
                <Stack justifyContent="center" alignItems="center" gap={1} flexDirection="row">
                  <Typography>Accrued Average Daily Balance:</Typography>
                  <Typography>{formatToCurrency(currentAdb, 'Fil-ph', 'Php')}</Typography>
                  <Typography>X</Typography>
                  <Stack>
                    <Typography variant="subtitle1">{`${getValues('interestRate') ?? 0}%`}</Typography>
                  </Stack>
                  <Typography>=</Typography>
                  <Stack>
                    <Typography>Interest Payable</Typography>
                    <Typography>
                      {formatToCurrency((currentAdb * (getValues('interestRate') ?? 0)) / 100, 'Fil-ph', 'Php')}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AdbCalculator;
