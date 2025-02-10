import React, { memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, DatePickerFieldProps } from '@mui/x-date-pickers';
import { Rows } from '@phosphor-icons/react';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import type { AccounTreeType } from '@/actions/accounts/types';
import {
  ILoanType,
  IRepaymentAction,
  repaymentAction,
} from '@/actions/loans/types';
import { Option } from '@/components/core/option';

import { FormInputFields } from './InputFields';

interface PageProps {
  open: boolean;
  handleClose: () => void;
  selectedRows: ILoanType[0]['Repayments'][0][];
  accounts: AccounTreeType;
  memberId: string | undefined;
}

function CreateAmortizationPayment({ open = true, handleClose, selectedRows, accounts, memberId }: PageProps) {
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRepaymentAction>({
    defaultValues: {
      paymentSched: [],
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

  // React.useEffect(() => {
  //   if (selectedRows.length > 0) {
  //     setValue(
  //       'paymentSched',
  //       selectedRows.map((rows) => ({
  //         ...rows,
  //         principal: Number(rows.principal),
  //         interest: Number(rows.interest),
  //         paymentSched: rows.paymentSched,
  //         repaymentId: rows.repaymentId,
  //       }))
  //     );
  //     console.log(getValues('paymentSched'));
  //   }
  // }, [selectedRows, setValue]);

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

  function submitHandler(data: any) {
    console.log(data);
  }

  const handleAddJournalLine = React.useCallback(() => {
    const existingLines = getValues('journalLineItems');
    return setValue('journalLineItems', [
      ...existingLines,
      {
        accountDetails: { accountId: '', accountName: '', group: '' },
        debit: 0,
        credit: 0,
        journalLineItemId: uuidv4(),
      },
    ]);
  }, [getValues, setValue]);
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
            {selectedRows.map((row, index) => (
              <Stack key={index} alignItems="center" spacing={2} direction="row">
                <Controller
                  control={control}
                  name={`paymentSched.${index}.paymentSched`}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel>Payment schedule</InputLabel>
                      <OutlinedInput {...field} value={dayjs(field.value).format('MMM DD YYYY')} disabled type="text" />
                    </FormControl>
                  )}
                />
                <Controller
                  name={`paymentSched.${index}.interest`}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel>Principal</InputLabel>
                      <OutlinedInput
                        {...field}
                        onChange={(event) => {
                          const parsedInput = Number(event.target.value);
                          if (!isNaN(parsedInput)) {
                            field.onChange(parsedInput);
                          }
                        }}
                        defaultValue={field.value}
                        type="number"
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={`paymentSched.${index}.principal`}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel>Interest</InputLabel>
                      <OutlinedInput
                        {...field}
                        onChange={(event) => {
                          const parsedInput = Number(event.target.value);
                          if (!isNaN(parsedInput)) {
                            field.onChange(parsedInput);
                          }
                        }}
                        defaultValue={field.value}
                        type="number"
                      />
                    </FormControl>
                  )}
                />
              </Stack>
            ))}
          </Stack>
          <Divider />
          <Stack spacing={2} marginY={2}>
            {watchJournalLines.map((_, index) => (
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
              </Stack>
            ))}
            <div>
              <Button onClick={handleAddJournalLine} variant="outlined" color="secondary">
                Add line
              </Button>
            </div>
            <DialogAction sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => console.log(errors)} variant="contained">
                details
              </Button>
              <Button type="submit" variant="contained">
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
