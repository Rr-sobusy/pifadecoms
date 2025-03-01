'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { FundTransactionsType, ReferenceType } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import { AccounTreeType } from '@/actions/accounts/types';
import { createFundTransaction } from '@/actions/funds/create-fund-transaction';
import type { FundTransactions } from '@/actions/funds/types';
import { IAddMemberSchema, memberFundsSchema } from '@/actions/funds/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface CreateSavingsTransactionProps {
  open: boolean;
  fundTransactions: FundTransactions;
  accounts: AccounTreeType;
  fundId: number;
  transactionType: FundTransactionsType;
}

const referenceTypeMap: Record<FundTransactionsType, ReferenceType> = {
  SavingsDeposit: 'SavingsDeposit',
  SavingsWithdrawal: 'SavingsWithdrawal',
  ShareCapDeposit: 'ShareDeposit',
  ShareCapWithdrawal: 'ShareWithdrawal',
};

export const CreateSavingsTransaction = ({
  open,
  fundTransactions,
  accounts,
  fundId,
  transactionType,
}: CreateSavingsTransactionProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const { execute, result, isExecuting } = useAction(createFundTransaction);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAddMemberSchema>({
    resolver: zodResolver(memberFundsSchema),
    defaultValues: {
      fundId: Number(fundId),
      journalType: ['SavingsDeposit', 'ShareCapDeposit'].includes(transactionType)
        ? 'cashReceipts'
        : 'cashDisbursement',
      fundType: ['SavingsDeposit', 'SavingsWithdrawal'].includes(transactionType) ? 'Savings' : 'ShareCapital',
      fundTransactionsType: transactionType,
      entryDate: new Date(),
      particulars: { memberId: fundTransactions?.Member.memberId, firstName: '', lastName: '' },

      journalLineItems: [
        {
          accountDetails: {
            accountId: '',
            accountName: '',
          },
          credit: 0,
          debit: 0,
          journalLineItemId: uuidv4(),
        },
        {
          accountDetails: {
            accountId: '',
            accountName: '',
          },
          credit: 0,
          debit: 0,
          journalLineItemId: uuidv4(),
        },
      ],
    },
  });

  const handleClose = () => {
    router.push(pathName);
  };

  React.useEffect(() => {
    if (result.data) {
      toast.success(`Transaction Posted`);
      router.push(pathName);
      reset();
    }
  }, [result]);

  const flattenAccounts = React.useMemo(
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
  const updateJournalItems = React.useCallback(
    (amount: number) => {
      const [firstLine, secondLine] = getValues('journalLineItems');
      setValue('journalLineItems', [
        { ...firstLine, debit: amount },
        { ...secondLine, credit: amount },
      ]);
    },
    [getValues, setValue]
  );

  React.useEffect(() => {
    function reconcileValue() {
      setValue('fundTransactionsType', transactionType);
      setValue(
        'fundType',
        ['SavingsDeposit', 'SavingsWithdrawal'].includes(transactionType) ? 'Savings' : 'ShareCapital'
      );
      setValue(
        'journalType',
        ['SavingsDeposit', 'ShareCapDeposit'].includes(transactionType) ? 'cashReceipts' : 'cashDisbursement'
      );
      setValue('referenceType', referenceTypeMap[transactionType]);
    }
    reconcileValue();
  }, [transactionType]);

  const submitHandler = (data: IAddMemberSchema) => {
    execute(data);
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6"> New Transaction</Typography>
              <Typography color="" variant="caption">
                Transact member&apos;s savings ({transactionType})
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={2} direction="column">
            <FormControl disabled>
              <InputLabel>Transaction Type</InputLabel>
              <OutlinedInput defaultValue="Deposit" />
            </FormControl>
            <FormControl disabled>
              <InputLabel>Member Name</InputLabel>
              <OutlinedInput
                defaultValue={`${fundTransactions?.Member.lastName} ${fundTransactions?.Member.firstName}`}
              />
            </FormControl>
            <Controller
              name="entryDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  onChange={(date) => {
                    field.onChange(date?.toDate());
                  }}
                  slotProps={{
                    textField: {
                      error: Boolean(errors.entryDate),
                      fullWidth: true,
                      helperText: errors.entryDate?.message,
                    },
                  }}
                  value={dayjs(field.value)}
                  label="Date Posted"
                />
              )}
            />
            <Controller
              control={control}
              name={`journalLineItems.0.accountDetails`}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  // filterOptions={(options, { inputValue }) =>
                  //   options.filter((option) =>
                  //     transactionType === 'SavingsDeposit' || transactionType === 'ShareCapDeposit'
                  //       ? option.rootType === 'Assets' &&
                  //         (!inputValue || option.accountName?.toLowerCase().includes(inputValue.toLowerCase()))
                  //       : transactionType === 'ShareCapWithdrawal'
                  //         ? option.rootType === 'Equity'
                  //         : option.rootType === 'Liability'
                  //   )
                  // }
                  options={flattenAccounts}
                  getOptionLabel={(option) => option.accountName}
                  groupBy={(option) => option.group}
                  renderInput={(params) => (
                    <FormControl error={Boolean(errors.journalLineItems)} fullWidth>
                      <InputLabel required>Depositing Acct. (Dr)</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                      {errors.journalLineItems && <FormHelperText>{errors.journalLineItems.message}</FormHelperText>}
                    </FormControl>
                  )}
                  renderOption={(props, options) => (
                    <Option {...props} key={options.accountId} value={options.accountId}>
                      <span style={{ marginLeft: 8 }}>{options.accountName}</span>
                    </Option>
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name={`journalLineItems.1.accountDetails`}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  // filterOptions={(options, { inputValue }) =>
                  //   options.filter((option) =>
                  //     transactionType === 'SavingsDeposit'
                  //       ? option.rootType === 'Liability'
                  //       : transactionType === 'ShareCapDeposit'
                  //         ? option.rootType === 'Equity' &&
                  //           (!inputValue || option.accountName?.toLowerCase().includes(inputValue.toLowerCase()))
                  //         : option.rootType === 'Assets'
                  //   )
                  // }
                  options={flattenAccounts}
                  getOptionLabel={(option) => option.accountName}
                  groupBy={(option) => option.group}
                  renderInput={(params) => (
                    <FormControl error={Boolean(errors.journalLineItems)} fullWidth>
                      <InputLabel required>Crediting Acct. (Cr)</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                      {errors.journalLineItems && <FormHelperText>{errors.journalLineItems.message}</FormHelperText>}
                    </FormControl>
                  )}
                  renderOption={(props, options) => (
                    <Option {...props} key={options.accountId} value={options.accountId}>
                      <span style={{ marginLeft: 8 }}>{options.accountName}</span>
                    </Option>
                  )}
                />
              )}
            />
            <Controller
              name="postedBalance"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.postedBalance)}>
                  <InputLabel required>Posting Amount</InputLabel>
                  <OutlinedInput
                    {...field}
                    onChange={(event) => {
                      const amount = Number(event.target.value);

                      if (!isNaN(amount)) {
                        field.onChange(amount);
                        updateJournalItems(amount);
                      }
                    }}
                    type="number"
                  />
                  {errors.postedBalance && <FormHelperText>{errors.postedBalance.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="reference"
              render={({ field }) => (
                <FormControl error={Boolean(errors.reference)} fullWidth>
                  <InputLabel required>OR No.</InputLabel>
                  <OutlinedInput {...field} />
                  {errors.reference && <FormHelperText>{errors.reference.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Stack justifyContent="flex-end" gap={2} flexDirection="row" marginTop={1}>
              <Button type="button" variant="outlined">
                Cancel
              </Button>
              <Button disabled={isExecuting} type="submit" variant="contained">
                {isExecuting ? 'Posting' : 'Post Transaction'}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};
