'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { LoanType } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';

import { dayjs } from '@/lib/dayjs';
import { addLoanSchema, type IAddLoanSchema } from '@/actions/loans/types';
import { Option } from '@/components/core/option';

import LoanTabs from './loan-tabs';

type Props = {};

const LoanTypeMap: Record<LoanType, string> = {
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
  Diminishing: 'Diminishing',
  EndOfTerm: 'End of Term',
};

// const RenderInputFields = ({ control, watch, setValue }) => (<FormControl fullWidth></FormControl>)

function CreateExistingLoan({}: Props) {
  const { control, watch, getValues, setValue } = useForm<IAddLoanSchema>({
    resolver: zodResolver(addLoanSchema),
    defaultValues: {
      paymentSched: [],
    },
  });

  const watchIsExisting = watch('isExisting');
  const watchLoanType = watch('loanType');
  const watchAmountLoaned = watch('amountLoaned');
  const watchInterest = watch('interest');
  const watchTermsInMonths = watch('termsInMonths');
  const watchIssueDate = watch('issueDate');
  const paymentSched = watch('paymentSched');

  const computeAmortizationSched = (): void => {
    const monthlyInterest = watchInterest / 100;
    const monthlyPayment =
      watchAmountLoaned * (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -watchTermsInMonths)));
    if (isNaN(monthlyPayment)) return;
    if (watchLoanType !== 'Diminishing') {
      const amortization = Array.from({ length: watchTermsInMonths }, (_, index) => {
        const balance = watchAmountLoaned - monthlyPayment * index;
        const interest = balance * monthlyInterest;
        const principal = monthlyPayment - interest;
        return {
          balance,
          interest,
          principal,
          paymentSched: dayjs(watchIssueDate)
            .add(index + 1, 'month')
            .toDate(),
          amountPaid: monthlyPayment,
          datePaid: null,
          isExisitng: false,
        };
      });
      console.log(amortization);
      setValue('paymentSched', amortization as any);
    }
  };
  return (
    <form>
      <Card>
        <CardContent>
          <LoanTabs />
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Loan Information</Typography>
              {/* <Controller
                control={control}
                name="isExisting"
                render={({ field }) => (
                  <FormControlText
                    label="Existing Loan (Historical loans that already affect the current balances)"
                    control={<Checkbox onChange={field.onChange} />}
                  />
                )}
              /> */}
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 2,
                    xs: 12,
                  }}
                >
                  <FormControl disabled fullWidth>
                    <InputLabel required>Loan ID</InputLabel>
                    <OutlinedInput defaultValue="Loan No. - ***" type="text" />
                  </FormControl>
                </Grid>
                <Grid
                  size={{
                    md: 5,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="member.memberId"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={[]}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <FormControl fullWidth>
                            <InputLabel required>Loaner Name</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                          </FormControl>
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 5,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="loanType"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Loan Type</InputLabel>
                        <Select {...field}>
                          {Object.entries(LoanTypeMap).map(([key, value]) => (
                            <Option key={key} value={key}>
                              {value}
                            </Option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormControl disabled={watchIsExisting} fullWidth>
                    <InputLabel>Journal Reference</InputLabel>
                    <OutlinedInput type="text" />
                  </FormControl>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="termsInMonths"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel required>Term in months</InputLabel>
                        <OutlinedInput {...field} type="number" />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="interest"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel required>Monthly interest rate (%)</InputLabel>
                        <OutlinedInput {...field} type="number" />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="amountLoaned"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel required>Amount released</InputLabel>
                        <OutlinedInput {...field} type="number" />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel required>Release date</InputLabel>
                    <DatePicker />
                  </FormControl>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button onClick={computeAmortizationSched} variant="outlined">
                      Compute amortization
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Payment amortization schedules</Typography>
              <Grid container spacing={3}>
                {paymentSched.map((_, index) => (
                  <Stack direction="row" spacing={2}>
                    <Stack justifyContent="space-between" direction="column">
                      <InputLabel>Number</InputLabel>
                      <Typography>{index + 1}</Typography>
                    </Stack>
                    <Controller
                      control={control}
                      name={`paymentSched.${index}.balance`}
                      render={({ field }) => (
                        <FormControl>
                          <InputLabel required>Payment Schedule</InputLabel>
                          <OutlinedInput
                            {...field}
                            disabled
                            value={dayjs(paymentSched[index].paymentSched).toDate().toLocaleDateString()}
                            type="text"
                          />
                        </FormControl>
                      )}
                    />

                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <DatePicker label="Date Paid" />
                    </Stack>
                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel>Amount paid</InputLabel>
                        <OutlinedInput type="number" />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel>Payment O.R</InputLabel>
                        <OutlinedInput type="text" />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel>Principal</InputLabel>
                        <OutlinedInput type="number" />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel>Interest</InputLabel>
                        <OutlinedInput type="number" />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={{
                        md: 'row',
                        xs: 'column',
                      }}
                      spacing={2}
                    >
                      <FormControl fullWidth>
                        <InputLabel>Balance</InputLabel>
                        <OutlinedInput type="number" />
                      </FormControl>
                    </Stack>
                  </Stack>
                ))}
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Journal Entries</Typography>
              <Grid container spacing={3}>
                <Stack direction="row" spacing={2}></Stack>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}

export default CreateExistingLoan;
