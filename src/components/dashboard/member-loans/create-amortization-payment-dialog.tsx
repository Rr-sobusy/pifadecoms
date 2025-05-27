'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Decimal from 'decimal.js';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import { createAmortizationPayment } from '@/actions/loans/create-amortization-payment';
import { IRepaymentAction, repaymentAction } from '@/actions/loans/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../../core/InputFields';

interface PageProps {
  open: boolean;
  handleClose: () => void;
  accounts: AccounTreeType;
  memberId: string | undefined;
  loanId: bigint | undefined;
}

function CreateAmortizationPayment({ open = true, handleClose, accounts, memberId, loanId }: PageProps) {
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRepaymentAction>({
    defaultValues: {
      paymentSched: [{ paymentSched: new Date(), datePaid: new Date(), principal: 0, interest: 0 }],
      loanId: Number(loanId),
      entryDate: new Date(),
      particulars: { firstName: '', lastName: '', memberId: memberId },
      journalType: 'cashReceipts',
      referenceType: 'LoanRepayments',
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
    resolver: zodResolver(repaymentAction),
  });

  const { execute, result, isExecuting } = useAction(createAmortizationPayment);

  const watchPaymentSched = watch('paymentSched');

  const watchJournalLines = watch('journalLineItems');

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

  function submitHandler(data: IRepaymentAction) {
    execute(data);
  }

  React.useEffect(() => {
    if (result.data?.success) {
      handleClose();
      toast.success('Payment successfully posted');
      reset();
    }
  }, [result]);

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

  const removeJournalLineItemHandler = React.useCallback(
    (lineItemId: string) => {
      const journalLines = getValues('journalLineItems');

      setValue(
        'journalLineItems',
        journalLines.filter((item) => item.journalLineItemId !== lineItemId)
      );
    },
    [setValue, getValues]
  );

  const totalDebits = watch('journalLineItems').reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredits = watch('journalLineItems').reduce((acc, curr) => acc + curr.credit, 0);
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '90%', width: '100%' },
      }}
      maxWidth="lg"
      open={open}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">Create Loan Repayments</Typography>
              <Typography color="" variant="caption">
                Create Payment for running and due loans
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={1} marginY={2}>
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
                inputLabel="Payment O.R"
                name="reference"
                variant="text"
              />
            </div>
          </Stack>
          <Divider />
          <Stack spacing={2} marginY={2}>
            <Typography variant="h6">Payment Line</Typography>
            <FormControlLabel control={<Checkbox />} label="Span payment" />
            {watchPaymentSched.map((_, index) => (
              <Stack key={index} alignItems="center" spacing={2} direction="row">
                <Controller
                  control={control}
                  name={`paymentSched.${index}.paymentSched`}
                  render={({ field }) => (
                    <FormControl sx={{ width: '20%' }}>
                      <InputLabel>Payment schedule</InputLabel>
                      <DatePicker
                        {...field}
                        value={dayjs(field.value)}
                        onChange={(date) => field.onChange(date?.toDate())}
                      />
                    </FormControl>
                  )}
                />
                <FormInputFields
                  control={control}
                  variant="number"
                  inputLabel="Principal"
                  name={`paymentSched.${index}.principal`}
                />
                <FormInputFields
                  control={control}
                  variant="number"
                  inputLabel="Interest"
                  name={`paymentSched.${index}.interest`}
                />
              </Stack>
            ))}
          </Stack>
          <Divider />
          <Stack spacing={2} marginY={2}>
            <Typography variant="h6">Journal Line</Typography>
            {watchJournalLines.map((items, index) => (
              <Stack key={index} direction="row" spacing={1}>
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
                  variant="number"
                  control={control}
                  inputLabel="Debit"
                  name={`journalLineItems.${index}.debit`}
                />
                <FormInputFields
                  variant="number"
                  control={control}
                  inputLabel="Credit"
                  name={`journalLineItems.${index}.credit`}
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
            <Stack sx={{ width: '50%' }}>
              <Typography variant="subtitle2">
                Total Debit : {formatToCurrency(totalDebits, 'Fil-ph', 'Php')}
              </Typography>
              <Typography variant="subtitle2">
                Total Credit : {formatToCurrency(totalCredits, 'Fil-ph', 'Php')}
              </Typography>
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
            </Stack>
            <div>
              <Button onClick={handleAddJournalLine} variant="outlined" color="secondary">
                Add line
              </Button>
            </div>
            <DialogAction sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => console.log(errors)} variant="contained">
                details
              </Button>
              <Button disabled={isExecuting} type="submit" variant="contained">
                Post Payment
              </Button>
            </DialogAction>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default React.memo(CreateAmortizationPayment);
