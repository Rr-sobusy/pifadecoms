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
import { LoanType } from '@prisma/client';
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

import { FormInputFields } from './InputFields';
import LoanTabs from './loan-tabs';

type Props = {
  loanSources: ILoanSources;
};

const LoanTypeMap: Record<LoanType, string> = {
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
  Diminishing: 'Diminishing',
  EndOfTerm: 'End of Term',
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

  const [member, setMemberData] = React.useState<MembersType[0][]>([]);

  const router = useRouter();

  const { execute, isExecuting, result } = useAction(createExistingLoan);

  const watchLoanType = watch('loanType');
  const watchTermsInMonths = watch('termsInMonths');
  const watchIssueDate = watch('issueDate');
  const paymentSched = watch('paymentSched');
  const memberData = watch('party');

  const memoizedComputeAmortizationSched = (): void => {
    const loanTypeMap: Record<string, dayjs.ManipulateType> = {
      Weekly: 'week',
      Monthly: 'month',
      Diminishing: 'month',
      Yearly: 'year',
      EndOfTerm: 'month',
    };

    const interval = loanTypeMap[watchLoanType] || 'month';

    setValue(
      'paymentSched',
      Array.from({ length: watchTermsInMonths }, (_, index) => ({
        interest: 0,
        isExisting: false,
        principal: 0,
        paymentSched: dayjs(watchIssueDate)
          .add(index + 1, interval)
          .toDate(),
      }))
    );
  };

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
        const data: MembersType = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {}
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
                    <InputLabel required>Loan ID</InputLabel>
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
                        onChange={(event, value) => {
                          field.onChange(value); // Update form value on selection
                        }}
                        options={member}
                        getOptionLabel={(option) =>
                          option && option.lastName && option.firstName ? `${option.lastName} ${option.firstName}` : ''
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
                  <FormInputFields control={control} name="termsInMonths" variant="number" inputLabel="No. of terms" />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    control={control}
                    name="interest"
                    variant="number"
                    inputLabel="Monthly interest rate"
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    control={control}
                    name="amountLoaned"
                    variant="number"
                    inputLabel="Amount loaned (Principal)"
                  />
                </Grid>
                <Grid
                  size={{
                    md: 4,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel required>Release date</InputLabel>
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
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button onClick={memoizedComputeAmortizationSched} variant="outlined">
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
                      name={`paymentSched.${index}.paymentSched`}
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
                    <Controller
                      control={control}
                      name={`paymentSched.${index}.datePaid`}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(date?.toDate());
                          }}
                          label="Date paid"
                        />
                      )}
                    />

                    <FormInputFields
                      sx={{ width: 'auto' }}
                      control={control}
                      inputLabel="Principal"
                      variant="number"
                      name={`paymentSched.${index}.principal`}
                    />

                    <FormInputFields
                      sx={{ width: 'auto' }}
                      control={control}
                      inputLabel="Interest"
                      variant="number"
                      name={`paymentSched.${index}.interest`}
                    />
                  </Stack>
                ))}
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
