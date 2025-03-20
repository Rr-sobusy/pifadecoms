'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { computeMonthlyBalances } from '@/lib/api-utils/calculate-balance-every-14th';
import type { MemberFundsType } from '@/actions/funds/types';
import { Option } from '@/components/core/option';

import MonthBalancesChart from './month-balances-chart';

interface Props {
  fund: MemberFundsType[0];
  open: boolean;
  computeAdbType: 'Savings' | 'ShareCapital';
}

enum YearsEnum {
  one = 2024,
  two = 2025,
  three = 2026,
}

const adbComponentsSchema = zod.object({
  year: zod.nativeEnum(YearsEnum),
  interestRate: zod.number(),
});

type IAdbSchema = zod.infer<typeof adbComponentsSchema>;

function AdbCalculator({ fund, open, computeAdbType }: Props) {
  const pathName = usePathname();
  const router = useRouter();

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdbSchema>({
    resolver: zodResolver(adbComponentsSchema),
  });

  // const fundTransaction = fund.Transactions.filter((transaction) =>
  //   computeAdbType === 'Savings' ? transaction.fundType === 'Savings' : transaction.fundType === 'ShareCapital'
  // );

  const searchParams = useSearchParams();
  const payload = searchParams.get('computeAdb') || 'Savings';

  const rex = computeMonthlyBalances(fund, getValues('year') ?? 0, payload as 'Savings' | 'ShareCapital');
  function handleClose() {
    router.push(pathName);
  }

  function submitHandler(_: IAdbSchema) {}

  // const currentAdb = calculateADB(
  //   fundTransaction.sort((a, b) => a.fundTransactId - b.fundTransactId),
  //   dayjs(getValues('startDate')),
  //   dayjs(getValues('endDate')),
  //   computeAdbType === 'Savings' ? fund.savingsBal : fund.shareCapBal
  // );

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { height: '85%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">{`ADB and Interest Payables (${computeAdbType ?? ''})`}</Typography>
              <Typography color="" variant="caption">
                {` Compute the Average Daily Balance based on movement of savings fund subject to date`}
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
                  xl: 6,
                  md: 12,
                }}
              >
                <Controller
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Year</InputLabel>
                      <Select {...field}>
                        {[2024, 2025, 2026, 2027, 2028].map((years) => (
                          <Option value={years} key={years}>
                            {years}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid
                size={{
                  xl: 6,
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
                {/* <Stack justifyContent="center" alignItems="center" gap={1} flexDirection="row">
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
                </Stack> */}
                <MonthBalancesChart interestRate={getValues('interestRate')} data={rex} />
              </CardContent>
            </Card>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AdbCalculator;
