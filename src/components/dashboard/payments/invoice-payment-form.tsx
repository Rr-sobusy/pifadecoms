'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { AccountType } from '@/actions/accounts/types';
import { createPaymentPosting } from '@/actions/invoice-payments/create-payments';
import { paymentSchema, type PaymentSchema } from '@/actions/invoice-payments/types';
import { SingleInvoiceType } from '@/actions/invoices/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

type PageProps = {
  invoiceDetails: SingleInvoiceType;
  accounts: AccountType;
};

function InvoicePaymentForm({ invoiceDetails, accounts }: PageProps) {
  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      invoiceId: invoiceDetails?.invoiceId,
      entryDate: new Date(),

      journalLineItems: [
        {
          journalLineItemId: uuidv4(),
          accountDetails: {
            accountId: '',
            accountName: ' -- Selected Deposit Acct.',
          },
          debit: 0,
          credit: 0,
        },
      ],
    },
  });

  const { executeAsync, isExecuting, result } = useAction(createPaymentPosting);

  const entryLineItems = watch('journalLineItems');

  const totalDebits = entryLineItems.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = entryLineItems.reduce((sum, item) => sum + item.credit, 0);

  const addJournalLine = React.useCallback(() => {
    const journalLines = getValues('journalLineItems');

    setValue('journalLineItems', [
      ...journalLines,
      {
        journalLineItemId: uuidv4(),
        accountDetails: {
          accountId: '',
          accountName: '',
        },
        debit: 0,
        credit: 0,
      },
    ]);
  }, [getValues, setValue]);

  const removeJournalLine = React.useCallback(
    (lineId: string) => {
      const journalLines = getValues('journalLineItems');

      setValue(
        'journalLineItems',
        journalLines.filter((lines) => lines.journalLineItemId !== lineId)
      );
    },
    [setValue, getValues]
  );

  const submitHandler = (data: PaymentSchema) => {
    try {
      executeAsync(data);

      if (!result.serverError) {
        toast.success('Payment posted.');
      }
    } catch (error) {
      toast.error('Error occured in server!' + ' ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={4}>
              <Typography variant="h6">Payment Details</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel required>Member Name</InputLabel>
                    <OutlinedInput
                      disabled
                      defaultValue={invoiceDetails?.Members.lastName + ', ' + invoiceDetails?.Members.firstName}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel required>Payment No.</InputLabel>
                    <OutlinedInput disabled defaultValue={`PAY - *`} />
                  </FormControl>
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel required>Invoice No.</InputLabel>
                    <OutlinedInput
                      disabled
                      defaultValue={`INV - ` + invoiceDetails?.invoiceId.toString().padStart(6, '0')}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="entryDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        format="MMM D, YYYY"
                        label="Payment date *"
                        value={dayjs(field.value)}
                        slotProps={{
                          textField: {
                            error: Boolean(errors.entryDate),
                            fullWidth: true,
                            helperText: errors.entryDate?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="depositingAccount"
                    render={({ field }) => (
                      <Autocomplete
                        options={accounts}
                        getOptionLabel={(option) => option.accountName}
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.depositingAccount)} fullWidth>
                            <InputLabel required>Depositing account</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.depositingAccount ? (
                              <FormHelperText>{errors.depositingAccount.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        filterOptions={(options, { inputValue }) =>
                          /**
                           * * Only render asset accounts
                           */
                          options.filter(
                            (option) =>
                              option.RootID?.rootType === 'Assets' &&
                              (!inputValue || option.accountName?.toLowerCase().includes(inputValue.toLowerCase()))
                          )
                        }
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
                          </Option>
                        )}
                        onChange={(_, value) => {
                          field.onChange(value);
                          const firstArr = getValues('journalLineItems');
                          setValue('journalLineItems', [
                            {
                              ...firstArr[0],
                              accountDetails: value as any,
                            },
                            ...firstArr.slice(1),
                          ]);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="orNo"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.orNo)} fullWidth>
                        <InputLabel>Payment O.R / Ref No.</InputLabel>
                        <OutlinedInput {...field} type="text" />
                        {errors.orNo ? <FormHelperText>{errors.orNo.message}</FormHelperText> : null}
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
                  <Controller
                    control={control}
                    name="paymentReceived"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.paymentReceived)} fullWidth>
                        <InputLabel required>
                          Amount Received{' '}
                          <span>{`(${formatToCurrency(invoiceDetails?.outStandingAmt ?? 0, 'Fil-ph', 'Php')} due)`}</span>
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          onChange={(e) => {
                            const firstArr = getValues('journalLineItems');
                            const value = e.target.value;
                            if (value) field.onChange(Number(value));
                            setValue('journalLineItems', [
                              {
                                ...firstArr[0],
                                debit: Number(value),
                                credit: 0,
                              },
                              ...firstArr.slice(1),
                            ]);
                          }}
                          type="number"
                        />
                        {errors.paymentReceived ? (
                          <FormHelperText>{errors.paymentReceived.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Typography variant="body2">Journal Entry</Typography>
              {/* ********  Journal Entry Table**********/}
              <Stack spacing={2}>
                {entryLineItems.map((journalLine, index) => (
                  <Stack spacing={3} direction="row" key={index}>
                    <Controller
                      name={`journalLineItems.${index}.accountDetails`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Autocomplete
                            {...field}
                            disabled={index === 0}
                            sx={{ width: '50%' }}
                            onChange={(_, value) => {
                              field.onChange(value);
                            }}
                            options={accounts}
                            filterOptions={(options, { inputValue }) =>
                              /**
                               * * Only render asset and revenue accounts
                               */
                              options.filter(
                                (option) =>
                                  option.RootID?.rootType === 'Assets' ||
                                  (option.RootID?.rootType === 'Revenue' &&
                                    (!inputValue ||
                                      option.accountName?.toLowerCase().includes(inputValue.toLowerCase())))
                              )
                            }
                            getOptionLabel={(account) => account.accountName}
                            renderInput={(params) => (
                              <FormControl fullWidth>
                                <InputLabel required>Account name</InputLabel>
                                <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                              </FormControl>
                            )}
                            renderOption={(props, options) => (
                              <Option {...props} key={options.accountId} value={options.accountId}>
                                {options.accountName}
                              </Option>
                            )}
                          />
                        );
                      }}
                    />
                    <Controller
                      control={control}
                      name={`journalLineItems.${index}.debit`}
                      render={({ field }) => (
                        <FormControl sx={{ width: '10%' }}>
                          <InputLabel>Debit</InputLabel>
                          <OutlinedInput
                            {...field}
                            onChange={(event) => field.onChange(Number(event.target.value))}
                            disabled={index === 0}
                            defaultValue={0}
                            type="number"
                          />
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`journalLineItems.${index}.credit`}
                      render={({ field }) => (
                        <FormControl sx={{ width: '10%' }}>
                          <InputLabel>Credit</InputLabel>
                          <OutlinedInput
                            {...field}
                            onChange={(event) => field.onChange(Number(event.target.value))}
                            disabled={index === 0}
                            defaultValue={0}
                            type="number"
                          />
                        </FormControl>
                      )}
                    />
                    <IconButton
                      disabled={index === 0}
                      color="error"
                      onClick={() => removeJournalLine(journalLine.journalLineItemId)}
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
                  <Stack sx={{ width: '10%', marginLeft: '-7px' }} spacing={3}>
                    <Typography variant="subtitle2">{formatToCurrency(totalCredits, 'Fil-ph', 'Php')}</Typography>
                  </Stack>
                </Stack>
                <div>
                  <Typography marginBottom={1} color="error">
                    {errors.journalLineItems?.root?.message}
                  </Typography>
                  <Button onClick={addJournalLine} color="secondary" startIcon={<PlusCircleIcon />} variant="outlined">
                    Add line
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Stack>
          <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => console.log(getValues())} type="button" variant="text" color="primary">
              Cancel
            </Button>
            <Button disabled={isExecuting} type="submit" variant="contained" color="primary">
              {isExecuting ? 'Posting' : 'Post payment'}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
}

export default InvoicePaymentForm;
