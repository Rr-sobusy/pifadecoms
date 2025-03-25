'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardActions } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import type { RepaymentInterval, RepaymentStyle } from '@prisma/client';
import Decimal from 'decimal.js';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { paths } from '@/paths';
import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import { createNewLoan } from '@/actions/loans/create-loan';
import { ILoanSources, loanSchemaExtended, type ILoanSchemaExtended } from '@/actions/loans/types';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from './InputFields';
import LoanTabs from './loan-tabs';

interface Props {
  accounts: AccounTreeType;
  loanSources: ILoanSources;
}

const repaymentStyle: Record<RepaymentStyle, string> = {
  Diminishing: 'Diminishing',
  StraightPayment: 'Straight payment',
  OneTime: 'End of term payment',
};

const repaymentInterval: Record<RepaymentInterval, string> = {
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
};

function CreateNewLoan({ accounts, loanSources }: Props) {
  const [member, setMemberData] = React.useState<MembersType[0][]>([]);
  const { execute, result, isExecuting } = useAction(createNewLoan);
  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,

    formState: { errors },
  } = useForm<ILoanSchemaExtended>({
    resolver: zodResolver(loanSchemaExtended),
    defaultValues: {
      journalType: 'cashDisbursement',
      referenceType: 'LoanDisbursements',
      paymentQty: 1,
      issueDate: new Date(),
      entryDate: new Date(),
      paymentSched: [],
      journalLineItems: Array(2)
        .fill(null)
        .map(() => ({
          journalLineItemId: uuidv4(),
          debit: 0,
          credit: 0,
          accountDetails: {
            accountId: '',
            accountName: '',
            group: '',
          },
        })),
    },
  });

  const watchPaymentQty = watch('paymentQty');
  const watchPaymentInterval = watch('repInterval');
  const watchRepaymentStyle = watch('repStyle');
  const watchIssueDate = watch('entryDate');
  const paymentSched = watch('paymentSched');
  const lineItems = watch('journalLineItems');

  const memberData = watch('particulars');

  const router = useRouter();

  const debouncedValue = useDebounce(memberData?.lastName ?? '', 300);

  React.useEffect(() => {
    if (result.data?.success) {
      toast.success(result.data.message.toString());
      router.push(paths.dashboard.loans.list);
    }
  }, [result]);

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

  const flattenedAccounts = React.useMemo(() => {
    return accounts.flatMap(
      (group) =>
        group.Children?.map((option) => ({
          ...option,
          rootType: group.rootType,
          group: group.rootName,
        })) || []
    );
  }, [accounts]);

  const handleAddJournallineLineItem = React.useCallback(() => {
    const journalLines = getValues('journalLineItems');
    setValue('journalLineItems', [
      ...journalLines,
      {
        journalLineItemId: uuidv4(),
        debit: 0,
        credit: 0,
        accountDetails: {
          accountId: '',
          accountName: '',
          group: '',
          createdAt: new Date(),
          isActive: true,
          openingBalance: new Decimal(0),
          runningBalance: new Decimal(0),
          rootId: 1,
          rootType: 'Assets',
          updatedAt: new Date(),
        },
      },
    ]);
  }, [getValues, setValue]);

  const removeJournalLineItemHandler = React.useCallback(
    (lineItemId: string) => {
      const journalLines = getValues('journalLineItems');

      setValue(
        'journalLineItems',
        journalLines.filter((lineItem) => lineItem.journalLineItemId !== lineItemId)
      );
    },
    [setValue, getValues]
  );

  const totalDebits = lineItems.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = lineItems.reduce((sum, item) => sum + item.credit, 0);

  const memoizedComputeAmortizationSched = (): void => {
    const loanTypeMap: Record<RepaymentInterval, dayjs.ManipulateType> = {
      Weekly: 'week',
      Monthly: 'month',
      Yearly: 'year',
    };

    const interval = loanTypeMap[watchPaymentInterval];

    setValue(
      'paymentSched',
      Array.from({ length: watchPaymentQty }, (_, index) => ({
        interest: 0,
        isExisting: false,
        principal: 0,
        paymentSched: dayjs(watchIssueDate)
          .add(index + 1, interval)
          .toDate(),
      }))
    );

    setValue('dueDate', dayjs(watchIssueDate).add(watchPaymentQty, interval).toDate());
  };

  function submitHandler(data: ILoanSchemaExtended) {
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
                    name="particulars"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        onInputChange={(_, value) => {
                          if (!value) {
                            return setValue('particulars.lastName', '');
                          }

                          setValue('particulars.lastName', value); // Update form value when input changes
                        }}
                        onChange={(_, value) => {
                          field.onChange(value); // Update form value on selection
                        }}
                        options={member}
                        getOptionLabel={(option) =>
                          option && option.lastName && option.firstName ? `${option.lastName} ${option.firstName}` : ''
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.particulars?.message)} fullWidth>
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
                        <Select {...field}>
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
                      <FormControl fullWidth>
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
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="reference"
                    inputLabel="Releasing Voucher No."
                    errors={errors}
                    variant="text"
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
                    name="entryDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        sx={{ width: '100%' }}
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                          setValue('entryDate', date ? date.toDate() : new Date());
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
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Stack spacing={2}>
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
                <Stack>
                  {
                    paymentSched.map((_,index)=>(<Typography key={index} variant='caption'></Typography>))
                  }
                </Stack>
                {/* {paymentSched.map((_, index) => (
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
                  </Stack>
                ))} */}
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Journal Entries</Typography>
              {lineItems.map((items, index) => (
                <Stack spacing={3} direction="row" key={index}>
                  <Controller
                    control={control}
                    name={`journalLineItems.${index}.accountDetails`}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        sx={{ width: '50%' }}
                        options={flattenedAccounts}
                        getOptionLabel={(option) => option.accountName}
                        groupBy={(option) => option.group}
                        renderInput={(params) => <TextField {...params} label="Account name *" />}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        renderOption={(props, option) => (
                          <Option {...props} value={option.accountId} key={option.accountId}>
                            <span style={{ marginLeft: 15 }}>{option.accountName}</span>
                          </Option>
                        )}
                        fullWidth
                      />
                    )}
                  />
                  <FormInputFields
                    control={control}
                    name={`journalLineItems.${index}.debit`}
                    inputLabel="Debit"
                    variant="number"
                  />
                  <FormInputFields
                    control={control}
                    name={`journalLineItems.${index}.credit`}
                    inputLabel="Credit"
                    variant="number"
                  />
                  <IconButton
                    onClick={() => removeJournalLineItemHandler(items.journalLineItemId)}
                    disabled={index === 0 || index === 1}
                    color="error"
                    sx={{ alignSelf: 'flex-end' }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Stack>
              ))}
              <Stack spacing={4} flexDirection="row">
                <Stack sx={{ width: '50%' }} spacing={3}>
                  <Typography variant="subtitle2">Totals</Typography>
                </Stack>
                <Stack sx={{ width: '10%' }} spacing={3}>
                  <Typography variant="subtitle2">{formatToCurrency(totalDebits, 'Fil-ph', 'Php')}</Typography>
                </Stack>
                <Stack sx={{ width: '10%', marginLeft: '95px' }} spacing={3}>
                  <Typography variant="subtitle2">{formatToCurrency(totalCredits, 'Fil-ph', 'Php')}</Typography>
                </Stack>
              </Stack>
              <div>
                <Typography marginBottom={1} color="error">
                  {errors.journalLineItems?.root?.message}
                </Typography>
                <Button
                  onClick={handleAddJournallineLineItem}
                  color="secondary"
                  startIcon={<PlusCircleIcon />}
                  variant="outlined"
                >
                  Add line
                </Button>
              </div>
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

export default CreateNewLoan;
