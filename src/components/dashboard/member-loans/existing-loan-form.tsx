'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
import type { RepaymentInterval, RepaymentStyle } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { createExistingLoan } from '@/actions/loans/create-loan';
import { addLoanSchema, ILoanSources, type IAddLoanSchema } from '@/actions/loans/types';
import { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../../core/InputFields';
import LoanTabs from './loan-tabs';

type Props = {
  loanSources: ILoanSources;
};

const repaymentStyle: Record<RepaymentStyle, string> = {
  Diminishing: 'Diminishing',
  StraightPayment: 'Straight payment',
  OneTime: 'End of term payment',
};

const repaymentInterval: Record<RepaymentInterval, string> = {
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
  None: 'None',
};

function CreateExistingLoan({ loanSources }: Props) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddLoanSchema>({
    resolver: zodResolver(addLoanSchema),
    defaultValues: {
      paymentSched: [],
    },
  });

  const [member, setMemberData] = React.useState<MembersType['members'][0][]>([]);

  const { execute, isExecuting, result } = useAction(createExistingLoan);
  const watchRepaymentStyle = watch('repStyle');

  const watchPaymentQty = watch('paymentQty');
  const watchPaymentInterval = watch('repInterval');
  const router = useRouter();

  const memberData = watch('party');

  React.useEffect(() => {
    if (result.data) {
      try {
        router.push(paths.dashboard.loans.list);
        toast.success('New loan added!');
      } catch (error) {
        logger.debug(`Error occured. Error message: ${error}`);
        toast.error('Error occured in server!');
      }
    }
  }, [result]);

  const debouncedValue = useDebounce(memberData?.lastName ?? '', 300);

  React.useEffect(() => {
    if (!debouncedValue) {
      setMemberData([]);
      return;
    }

    async function fetchMemberDataOnDebounce() {
      try {
        const data: MembersType['members'] = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {
        logger.debug(`Error occured. Error message: ${error}`);
        toast.error('Error occured in server!');
      }
    }
    fetchMemberDataOnDebounce();
  }, [debouncedValue]);

  function submitHandler(data: IAddLoanSchema) {
    execute(data);
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <LoanTabs />
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Loan Information</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 2,
                    xs: 12,
                  }}
                >
                  <FormControl disabled fullWidth>
                    <InputLabel>Loan ID</InputLabel>
                    <OutlinedInput defaultValue="Loan No. - ***" type="text" />
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
                    name="party"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        onInputChange={(_, value) => {
                          if (!value) {
                            return setValue('party.lastName', '');
                          }

                          setValue('party.lastName', value); // Update form value when input changes
                        }}
                        onChange={(_, value) => {
                          field.onChange(value); // Update form value on selection
                        }}
                        options={member}
                        getOptionLabel={(option) =>
                          option.lastName.length ? `${option.lastName} ${option.firstName}` : ''
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.party?.message)} fullWidth>
                            <FormLabel required>Member Name</FormLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.memberId} value={options.memberId}>
                            {`${options.lastName}, ${options.firstName}`}
                          </Option>
                        )}
                      />
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
                    name="loanSource"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel required>Loan Source</InputLabel>
                        <Select {...field}>
                          {loanSources.map((source) => (
                            <Option key={source.sourceId} value={source.sourceId}>
                              {source.sourceName}
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
                  <Controller
                    control={control}
                    name="repStyle"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel required>Repayment Style</InputLabel>
                        <Select
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value === 'OneTime') {
                              setValue('repInterval', 'None');
                              setValue('paymentQty', 1);
                            }
                          }}
                        >
                          {Object.entries(repaymentStyle).map(([key, value]) => (
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
                  <Controller
                    control={control}
                    name="repInterval"
                    render={({ field }) => (
                      <FormControl disabled={watchRepaymentStyle === 'OneTime'} fullWidth>
                        <InputLabel required>Repayment Interval</InputLabel>
                        <Select {...field}>
                          {Object.entries(repaymentInterval).map(([key, value]) => (
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
                  <FormInputFields
                    isDisabled={watchRepaymentStyle === 'OneTime'}
                    sx={{ width: '100%' }}
                    control={control}
                    name="paymentQty"
                    inputLabel="Number of payments"
                    errors={errors}
                    variant="number"
                    isRequired
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="interest"
                    inputLabel="Interest rate"
                    errors={errors}
                    variant="number"
                    isRequired
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="amountLoaned"
                    inputLabel="Amount loaned (Principal)"
                    errors={errors}
                    variant="number"
                    isRequired
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="amountPayable"
                    inputLabel="Amount payable"
                    errors={errors}
                    variant="number"
                    isRequired
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
                    name="issueDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ width: '100%' }}
                        onChange={(date) => {
                          field.onChange(date?.toDate());

                          const loanTypeMap: Record<RepaymentInterval, dayjs.ManipulateType | null> = {
                            Weekly: 'week',
                            Monthly: 'month',
                            Yearly: 'year',
                            None: null,
                          };

                          const interval = loanTypeMap[watchPaymentInterval];
                          if (interval && date) {
                            setValue('dueDate', dayjs(date).add(watchPaymentQty, interval).toDate());
                          }
                        }}
                        defaultValue={dayjs()}
                        value={dayjs(field.value)}
                        label="Released Date"
                      />
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
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ width: '100%' }}
                        disabled={watchRepaymentStyle !== 'OneTime'}
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        defaultValue={dayjs()}
                        value={dayjs(field.value)}
                        label="Due Date"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={() => console.log(errors)} variant="outlined">
            Cancel
          </Button>
          <Button disabled={isExecuting} type="submit" variant="contained">
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default CreateExistingLoan;
