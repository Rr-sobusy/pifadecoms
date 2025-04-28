'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { FormInputFields } from '@/components/core/InputFields';
import { Option } from '@/components/core/option';

// Zod Schema
const loanCalculatorSchema = z
  .object({
    loanAmount: z.number().min(0, 'Loan amount must be greater than 0'),
    interestRate: z.number().min(0, 'Interest rate must be greater than 0'),
    loanContract: z.enum(['StraightPayment', 'Diminishing', 'OneTime']),
    insuranceFee: z.number().default(0),
    fillingFeePercent: z.number(),
    repaymentInterval: z.enum(['Monthly', 'Weekly', 'Yearly', 'None']),
    paymentQty: z.number().min(1, 'Payment quantity must be at least 1'),
    releasedDate: z.date().optional(),
    dueDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.loanContract === 'OneTime') {
      if (!data.releasedDate) {
        ctx.addIssue({
          path: ['releasedDate'],
          code: z.ZodIssueCode.custom,
          message: 'Released date is required for OneTime loan contracts',
        });
      }
      if (!data.dueDate) {
        ctx.addIssue({
          path: ['dueDate'],
          code: z.ZodIssueCode.custom,
          message: 'Due date is required for OneTime loan contracts',
        });
      }
    }
  });

function returnNumberOfMonths(
  paymentQty: number | undefined,
  repInterval: z.infer<typeof loanCalculatorSchema>['repaymentInterval'] | undefined
): number | undefined {
  if (typeof paymentQty !== 'number' || !repInterval) return undefined;

  switch (repInterval) {
    case 'Weekly':
      return paymentQty / 4;
    case 'Monthly':
      return paymentQty;
    case 'Yearly':
      return paymentQty * 12;
    default:
      return undefined;
  }
}

// Label Mapping
const loanContractMap: Record<z.infer<typeof loanCalculatorSchema>['loanContract'], string> = {
  StraightPayment: 'Straight Payment',
  Diminishing: 'Diminishing',
  OneTime: 'End of term',
};

const repaymentIntervalMap: Record<z.infer<typeof loanCalculatorSchema>['repaymentInterval'], string> = {
  Monthly: 'Monthly',
  Weekly: 'Weekly',
  Yearly: 'Yearly',
  None: 'None',
};

function LoanCalculator() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof loanCalculatorSchema>>({
    resolver: zodResolver(loanCalculatorSchema),
    mode: 'onTouched',
    defaultValues: {
      fillingFeePercent: 1,
      interestRate: 2.5,
    },
  });

  const selectedContract = watch('loanContract');

  React.useEffect(() => {
    if (selectedContract === 'OneTime') {
      setValue('paymentQty', 1);
      setValue('repaymentInterval', 'None');
    }
  }, [selectedContract, setValue]);

  const [values, setValues] = React.useState<z.infer<typeof loanCalculatorSchema>>();

  function submitHandler(data: z.infer<typeof loanCalculatorSchema>) {
    setValues(data);
  }

  const totalInterest =
    (values?.loanAmount || 0) *
    ((values?.interestRate || 0) / 100) *
    (values?.loanContract === 'OneTime'
      ? dayjs(values.dueDate).diff(dayjs(values.releasedDate), 'month')
      : returnNumberOfMonths(values?.paymentQty, values?.repaymentInterval) || 0);

  const fillingFeeAndServiceCharge = ((values?.loanAmount ?? 0) * (values?.fillingFeePercent ?? 0)) / 100;

  return (
    <Stack spacing={3}>
      <Card>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">Loan Details</Typography>

              <Stack>
                <Grid container spacing={2} marginTop={2}>
                  {/* Loan Contract */}
                  <Grid size={{ md: 3, sm: 12 }}>
                    <Controller
                      name="loanContract"
                      control={control}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.loanContract)} fullWidth>
                          <InputLabel id="loanContract-label">Loan Contract</InputLabel>
                          <Select {...field}>
                            {Object.entries(loanContractMap).map(([key, value]) => (
                              <Option key={key} value={key}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 3, sm: 12 }}>
                    <Controller
                      name="repaymentInterval"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          disabled={selectedContract === 'OneTime'}
                          error={Boolean(errors.repaymentInterval)}
                          fullWidth
                        >
                          <InputLabel id="loanContract-label">Repayment Interval</InputLabel>
                          <Select {...field} label="RepaymentInterval">
                            {Object.entries(repaymentIntervalMap).map(([key, value]) => (
                              <Option key={key} value={key}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Interest Rate */}

                  <Grid size={{ md: 2, sm: 12 }}>
                    <FormInputFields
                      errors={errors}
                      sx={{ width: '100%' }}
                      variant="number"
                      inputLabel="Loan Amount"
                      name="loanAmount"
                      control={control}
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 12 }}>
                    <FormInputFields
                      errors={errors}
                      sx={{ width: '100%' }}
                      variant="number"
                      inputLabel="Interest Rate per month (%)"
                      name="interestRate"
                      control={control}
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 12 }}>
                    <FormInputFields
                      isDisabled={selectedContract === 'OneTime'}
                      errors={errors}
                      sx={{ width: '100%' }}
                      variant="number"
                      inputLabel="Number of payment(s)"
                      name="paymentQty"
                      control={control}
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 12 }}>
                    <FormInputFields
                      errors={errors}
                      sx={{ width: '100%' }}
                      control={control}
                      name="fillingFeePercent"
                      inputLabel="Filling fee & Serv. Charge (%)"
                      variant="number"
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 12 }}>
                    <FormInputFields
                      errors={errors}
                      sx={{ width: '100%' }}
                      control={control}
                      name="insuranceFee"
                      inputLabel="Insurance Fee"
                      variant="number"
                    />
                  </Grid>

                  {selectedContract === 'OneTime' && (
                    <>
                      <Grid size={{ md: 3, sm: 12 }}>
                        <Controller
                          control={control}
                          name="releasedDate"
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(date) => field.onChange(date?.toDate())}
                              label="Released Date"
                              sx={{ width: '100%' }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid size={{ md: 3, sm: 12 }}>
                        <Controller
                          control={control}
                          name="dueDate"
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(date) => field.onChange(date?.toDate())}
                              label="Due Date"
                              sx={{ width: '100%' }}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Stack flexDirection="row-reverse">
                  <div>
                    <Button variant="contained" type="submit">
                      Compute
                    </Button>
                    {/* <Button onClick={() => console.log(errors)} variant="contained" type="button">
                      debug
                    </Button> */}
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </form>
      </Card>
      {values && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography marginBottom={2} variant="h5">
                  Computation Result
                </Typography>
                <Typography>Loan Contract : {loanContractMap[values?.loanContract ?? 'Diminishing']}</Typography>
                <Typography>
                  Payment Interval : {repaymentIntervalMap[values?.repaymentInterval ?? 'Monthly']}
                </Typography>
                <Typography>Loan Amount: {formatToCurrency(values?.loanAmount ?? 0)}</Typography>
                <Typography>Interest Rate: {values?.interestRate}%</Typography>
                {values?.loanContract !== 'Diminishing' && (
                  <Typography>
                    Total Interest: {formatToCurrency(totalInterest)} in {values?.paymentQty} payments
                  </Typography>
                )}
                <Typography>Filing Fee & Serv. Charge: {formatToCurrency(fillingFeeAndServiceCharge)}</Typography>
                <Typography>Insurances: {formatToCurrency(values?.insuranceFee ?? 0)}</Typography>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography marginBottom={2} variant="h5">
                  Suggested Journal Entry
                </Typography>
                <Typography>
                  Loan Receivable (Dr.):{' '}
                  {formatToCurrency(
                    (values?.loanContract !== 'Diminishing' ? totalInterest : 0) +
                      fillingFeeAndServiceCharge +
                      (values?.loanAmount || 0) +
                      (values?.insuranceFee ?? 0)
                  )}
                </Typography>
                <Typography>Cash on hand (Cr.): {formatToCurrency(values?.loanAmount ?? 0)}</Typography>
                {values?.loanContract !== 'Diminishing' && (
                  <Typography>Interest Income (Cr.): {formatToCurrency(totalInterest)}</Typography>
                )}
                <Typography>
                  Filling Fee & Service Charge (Cr.): {formatToCurrency(fillingFeeAndServiceCharge)}
                </Typography>
                {values?.insuranceFee !== undefined && values?.insuranceFee !== 0 && (
                  <Typography>Insurance (Cr.): {formatToCurrency(values.insuranceFee)}</Typography>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}

export default LoanCalculator;
