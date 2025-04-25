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

import { FormInputFields } from '@/components/core/InputFields';
import { Option } from '@/components/core/option';

// Zod Schema
const loanCalculatorSchema = z
  .object({
    loanAmount: z.number().min(0, 'Loan amount must be greater than 0'),
    interestRate: z.number().min(0, 'Interest rate must be greater than 0'),
    loanContract: z.enum(['StraightPayment', 'Diminishing', 'OneTime']),
    otherFees: z.number().default(0),
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
  } = useForm<z.infer<typeof loanCalculatorSchema>>({
    resolver: zodResolver(loanCalculatorSchema),
    mode: 'onTouched',
  });

  const selectedContract = watch('loanContract');

  function submitHandler(data: z.infer<typeof loanCalculatorSchema>) {
    console.log(data);
  }

  return (
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
                      <FormControl fullWidth>
                        <InputLabel id="loanContract-label">Loan Contract</InputLabel>
                        <Select
                          {...field}
                        >
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
                      <FormControl fullWidth>
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
                    sx={{ width: '100%' }}
                    variant="number"
                    inputLabel="Loan Amount"
                    name="loanAmount"
                    control={control}
                  />
                </Grid>

                <Grid size={{ md: 2, sm: 12 }}>
                  <FormInputFields
                    sx={{ width: '100%' }}
                    variant="number"
                    inputLabel="Interest Rate (%)"
                    name="interestRate"
                    control={control}
                  />
                </Grid>

                <Grid size={{ md: 2, sm: 12 }}>
                  <FormInputFields
                    sx={{ width: '100%' }}
                    variant="number"
                    inputLabel="Number of payment(s)"
                    name="paymentQty"
                    control={control}
                  />
                </Grid>

                <Grid size={{ md: 2, sm: 12 }}>
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="otherFees"
                    inputLabel="Other Fee (filling, insurance & etc)"
                    variant="number"
                  />
                </Grid>

                {selectedContract === 'OneTime' && (
                  <>
                    <Grid size={{ md: 3, sm: 12 }}>
                      <Controller
                        control={control}
                        name="releasedDate"
                        render={() => <DatePicker label="Released Date" sx={{ width: '100%' }} />}
                      />
                    </Grid>

                    <Grid size={{ md: 3, sm: 12 }}>
                      <Controller
                        control={control}
                        name="dueDate"
                        render={() => <DatePicker sx={{ width: '100%' }} />}
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
                  <Button onClick={() => console.log(errors)} variant="contained" type="button">
                    debug
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </form>
    </Card>
  );
}

export default LoanCalculator;
