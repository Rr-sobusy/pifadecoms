'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
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
import type { AccounTreeType } from '@/actions/accounts/types';
import { createPaymentPosting } from '@/actions/invoice-payments/create-payments';
import { paymentSchema, type PaymentSchema } from '@/actions/invoice-payments/types';
import { SingleInvoiceType } from '@/actions/invoices/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface PageProps {
  invoiceDetails: SingleInvoiceType;
  accounts: AccounTreeType;
}

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
      particulars: {
        memberId: invoiceDetails?.memberId,
        firstName: invoiceDetails?.Members.firstName,
        lastName: invoiceDetails?.Members.lastName,
      },
      journalType: 'cashReceipts',
      referenceType: 'SalesPayments',
      entryDate: new Date(),

      journalLineItems: [
        {
          journalLineItemId: uuidv4(),
          accountDetails: {
            accountId: '',
            accountName: '--Selected Depositing acct.',
          },
          debit: 0,
          credit: 0,
        },
      ],
    },
  });

  const { execute, isExecuting, result } = useAction(createPaymentPosting.bind(0, invoiceDetails?.outStandingAmt ?? 0));

  const entryLineItems = watch('journalLineItems');

  const totalDebits = entryLineItems.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = entryLineItems.reduce((sum, item) => sum + item.credit, 0);

  const addJournalLine = React.useCallback(() => {
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
        },
      },
    ]);
  }, [getValues, setValue]);

  const flattendAccounts = accounts.flatMap((group) =>
    group.Children.map((option) => ({
      ...option,
      rootType: group.rootType,
      group: group.rootName,
    }))
  );

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

  React.useEffect(() => {
    if (result.data) {
      toast.success('Payments Posted.');
    }
  }, [result.data]);

  const submitHandler = (data: PaymentSchema) => {
    execute(data);
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
                        options={flattendAccounts}
                        getOptionLabel={(option) => option.accountName}
                        groupBy={(option) => option.group}
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
                              option.rootType === 'Assets' &&
                              (!inputValue || option.accountName?.toLowerCase().includes(inputValue.toLowerCase()))
                          )
                        }
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            <span style={{ marginLeft: 8 }}> {options.accountName}</span>
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
                    name="reference"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.reference)} fullWidth>
                        <InputLabel>Payment O.R / Ref No.</InputLabel>
                        <OutlinedInput {...field} type="text" />
                        {errors.reference ? <FormHelperText>{errors.reference.message}</FormHelperText> : null}
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
                        <InputLabel sx={{ display: 'flex', gap: 1 }} required>
                          Amount Received{' '}
                          <Box
                            component="label"
                            color="red"
                          >{`(${formatToCurrency(invoiceDetails?.outStandingAmt ?? 0, 'Fil-ph', 'Php')} balance remaining)`}</Box>
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
                            options={flattendAccounts}
                            filterOptions={(options, { inputValue }) =>
                              /**
                               * * Only render asset and revenue accounts
                               */
                              options.filter(
                                (option) =>
                                  option.rootType === 'Assets' ||
                                  (option.rootType === 'Revenue' &&
                                    (!inputValue ||
                                      option.accountName?.toLowerCase().includes(inputValue.toLowerCase())))
                              )
                            }
                            groupBy={(option) => option.group}
                            getOptionLabel={(account) => account.accountName}
                            renderInput={(params) => (
                              <FormControl fullWidth>
                                <InputLabel required>Account name</InputLabel>
                                <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                              </FormControl>
                            )}
                            renderOption={(props, options) => (
                              <Option {...props} key={options.accountId} value={options.accountId}>
                                <span style={{ marginLeft: 8 }}>{options.accountName}</span>
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
            <Button onClick={() => console.log(errors)} type="button" variant="text" color="primary">
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
