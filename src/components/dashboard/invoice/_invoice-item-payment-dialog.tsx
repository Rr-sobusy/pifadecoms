'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Decimal from 'decimal.js';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { AccounTreeType } from '@/actions/accounts/types';
import { invoiceItemPaymentAction } from '@/actions/invoice-payments/create-invoice-item-payment';
import type { InvoiceItemPerMemberTypes } from '@/actions/invoices/types';
import { invoiceItemsPaymentschema, type InvoiceItemsPaymentType } from '@/actions/invoices/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../member-loans/InputFields';

const dueMonth = 1;

type PageProps = {
  open: boolean;
  handleClose: () => void;
  selectedRows: InvoiceItemPerMemberTypes;
  accounts: AccounTreeType;
};

function isPastDue(inputtedDate: Date): boolean {
  return !dayjs(inputtedDate).add(dueMonth, 'M').isSameOrAfter(dayjs(), 'D');
}

function computeRemainingInterest(inputtedDate: Date, toPay: number, rate: number): number {
  const numberOfMonthsPast = dayjs(inputtedDate).add(dueMonth, 'M').diff(dayjs(), 'M');

  return (rate / 100) * toPay * (numberOfMonthsPast - 1) * -1;
}

function InvoiceItemPaymentDialog({ open = true, handleClose, selectedRows, accounts }: PageProps) {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InvoiceItemsPaymentType>({
    resolver: zodResolver(invoiceItemsPaymentschema),
    defaultValues: {
      entryDate: new Date(),
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
      particulars: { firstName: '', lastName: '', memberId: '' },
      journalType: 'cashReceipts',
      referenceType: 'SalesPayments',
    },
  });

  const searchParams = useSearchParams();

  const { execute, result, isExecuting } = useAction(invoiceItemPaymentAction);

  /**
   * * Map to paymentLine based on what values selected in data table
   */
  React.useEffect(() => {
    if (!selectedRows || selectedRows.length === 0) return;
    setValue(
      'paymentLine',
      selectedRows.map((row) => ({
        invoiceItemId: Number(row.invoiceItemId),
        itemName: row.Item.itemName,
        quantityPurchased: row.quantity,
        principal: row.principalPrice,
        trade: row.trade,
        principalPaying: 0,
        interestPaying: 0,
        tradePaying: 0,
      }))
    );
  }, [selectedRows, setValue]);

  React.useEffect(() => {
    if (result.data?.success) {
      handleClose();
      toast.success('Payment posted.');
      reset();
    }
  }, [result]);

  React.useEffect(() => {
    setValue('particulars.memberId', searchParams.get('memberId') || '');
  }, [searchParams.get('memberId')]);

  const flattenedAccounts = React.useMemo(
    () =>
      accounts.flatMap((group) =>
        group.Children.map((account) => ({
          ...account,
          group: group.rootName,
          rootType: group.rootType,
        }))
      ),
    [accounts]
  );

  const handleAddJournalLine = React.useCallback(() => {
    const existingLines = getValues('journalLineItems');
    return setValue('journalLineItems', [
      ...existingLines,
      {
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
        debit: 0,
        credit: 0,
        journalLineItemId: uuidv4(),
      },
    ]);
  }, [getValues, setValue]);

  const handleDeleteJournalLine = React.useCallback(
    (itemId: string) => {
      const existingLines = getValues('journalLineItems');
      const filteredLines = existingLines.filter((line) => line.journalLineItemId !== itemId);
      setValue('journalLineItems', filteredLines);
    },
    [getValues, setValue]
  );

  const paymentTotal = watch('paymentLine')?.reduce(
    (acc, curr) => acc + (curr.principalPaying + curr.interestPaying + curr.tradePaying),
    0
  );

  const watchPaymentLine = watch('paymentLine') || [];
  const watchJournalLines = watch('journalLineItems');
  const totalDebits = watch('journalLineItems').reduce((acc, curr) => acc + curr.debit || 0, 0);
  const totalCredits = watch('journalLineItems').reduce((acc, curr) => acc + curr.credit || 0, 0);
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '98%', width: '100%' },
      }}
      maxWidth="xl"
      open={open}
    >
      <form
        onSubmit={handleSubmit((data) => {
          execute(data);
        })}
      >
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">Create Invoice Item payments</Typography>
              <Typography color="" variant="caption">
                Pay items included in member invoice
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack marginY={2} spacing={1}>
            <div>
              <Controller
                control={control}
                name="entryDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    slotProps={{
                      textField: {
                        error: Boolean(errors.entryDate),
                        helperText: errors.entryDate?.message,
                      },
                    }}
                    value={dayjs(field.value)}
                    label="Payment Date"
                  />
                )}
              />
            </div>
            <div>
              <FormInputFields
                sx={{ width: 'auto' }}
                control={control}
                variant="text"
                inputLabel="Payment O.R"
                name="reference"
              />
            </div>
          </Stack>
          <Divider />
          <Stack marginY={2} spacing={1}>
            <Typography variant="h6">Payment Line</Typography>
            {watchPaymentLine.map((_, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <FormInputFields
                  isDisabled
                  errors={errors.paymentLine?.[index]?.itemName}
                  control={control}
                  name={`paymentLine.${index}.itemName`}
                  variant="text"
                  inputLabel="Item Name"
                />
                <FormControl>
                  <InputLabel>To pay quantity</InputLabel>
                  <OutlinedInput
                    onChange={(event) => {
                      const value = event.target.value;
                      const parsedValue = Number(value);
                      const currentRow = selectedRows[index];
                      const totalAmountPerItem = watchPaymentLine[index].trade + watchPaymentLine[index].principal;
                      setValue(
                        `paymentLine.${index}.principalPaying`,
                        Number(value) * watchPaymentLine[index].principal
                      );

                      setValue(`paymentLine.${index}.tradePaying`, Number(value) * watchPaymentLine[index].trade);

                      if (isPastDue(currentRow.Invoice.dateOfInvoice) && !currentRow.isTotallyPaid) {
                        setValue(
                          `paymentLine.${index}.interestPaying`,
                          computeRemainingInterest(selectedRows[index].Invoice.dateOfInvoice, totalAmountPerItem, 2) *
                            parsedValue
                        );
                      }
                    }}
                    type="number"
                  />
                </FormControl>
                <FormInputFields
                  isDisabled
                  errors={errors.paymentLine?.[index]?.tradePaying}
                  control={control}
                  name={`paymentLine.${index}.tradePaying`}
                  variant="number"
                  inputLabel="Total trade"
                />
                <FormInputFields
                  isDisabled
                  errors={errors.paymentLine?.[index]?.principalPaying}
                  control={control}
                  name={`paymentLine.${index}.principalPaying`}
                  variant="number"
                  inputLabel="Total principal (A.R)"
                />
                <FormInputFields
                  isDisabled
                  errors={errors.paymentLine?.[index]?.interestPaying}
                  control={control}
                  name={`paymentLine.${index}.interestPaying`}
                  variant="number"
                  inputLabel="Total interest"
                />
              </Stack>
            ))}
            <Typography sx={{ textDecoration: 'underline', marginTop: 2 }} variant="subtitle2">
              Payment-line total : {formatToCurrency(paymentTotal, 'Fil-ph', 'Php')}
            </Typography>
          </Stack>
          <Divider />
          <Stack marginY={2} spacing={1}>
            <Typography variant="h6">Journal line</Typography>
            {watchJournalLines.map((item, index) => (
              <Stack alignItems="center" key={index} spacing={2} direction="row">
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
                  errors={errors.journalLineItems?.[index]?.debit}
                  control={control}
                  variant="number"
                  inputLabel="Debit"
                  name={`journalLineItems.${index}.debit`}
                />
                <FormInputFields
                  errors={errors.journalLineItems?.[index]?.credit}
                  control={control}
                  variant="number"
                  inputLabel="Credit"
                  name={`journalLineItems.${index}.credit`}
                />
                <IconButton
                  onClick={() => handleDeleteJournalLine(item.journalLineItemId)}
                  disabled={index === 0 || index === 1}
                  color="error"
                  sx={{ alignSelf: 'flex-end' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Stack>
              <Stack direction="row">
                <Typography variant="subtitle2">Total Debits:</Typography>
                <Typography variant="subtitle2">{formatToCurrency(totalDebits, 'Fil-ph', 'Php')}</Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="subtitle2">Total Credits:</Typography>
                <Typography variant="subtitle2">{formatToCurrency(totalCredits, 'Fil-ph', 'Php')}</Typography>
              </Stack>
            </Stack>
            <Stack>
              {Object.keys(errors).length > 0 && (
                <Stack>
                  {Object.entries(errors).map(([field, error]) => (
                    <Typography color="error" variant="subtitle2" key={field}>
                      {error.root?.message}
                    </Typography>
                  ))}
                </Stack>
              )}
              {errors.journalLineItems?.[0] && (
                <Typography color="error" variant="subtitle2">
                  {errors.journalLineItems[0].root?.message}
                </Typography>
              )}
            </Stack>
            <div>
              <Button onClick={handleAddJournalLine} variant="outlined" color="secondary">
                Add line
              </Button>
            </div>
          </Stack>
        </DialogContent>
        <DialogAction sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={isExecuting} variant="contained" type="submit">
            {isExecuting ? 'Posting' : 'Post Payment'}
          </Button>
        </DialogAction>
      </form>
    </Dialog>
  );
}

export default React.memo(InvoiceItemPaymentDialog);
