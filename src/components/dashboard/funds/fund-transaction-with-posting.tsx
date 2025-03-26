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

import { FormInputFields } from '../member-loans/InputFields';

interface FundTransactionWithPostingProps {
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

export const FundTransactionWithPosting = ({
  open,
  fundTransactions,
  accounts,
  fundId,
  transactionType,
}: FundTransactionWithPostingProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const { execute, result, isExecuting } = useAction(createFundTransaction);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    getValues,
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
    router.push(pathName, { scroll: false });
  };

  React.useEffect(() => {
    if (result.data) {
      if (result.data.success) {
        toast.success(`Transaction Posted`);
        router.push(pathName);
        reset();
      } else {
        toast.error('Transaction failed. Please try again.');
      }
    }
  }, [result]);

  const flattenAccounts = React.useMemo(
    () =>
      // Filter only Assets, Liabilities, and Equity
      accounts
        .filter(
          (account) =>
            account.rootType === 'Assets' || account.rootType === 'Liability' || account.rootType === 'Equity'
        )
        .flatMap((group) =>
          group.Children.map((account) => ({
            ...account,
            group: group.rootName,
            rootType: group.rootType,
          }))
        ),
    [accounts]
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

  const watchJournalLineItems = watch('journalLineItems');
  const watchPostedBalance = watch('postedBalance');

  React.useEffect(() => {
    if (!watchJournalLineItems.length) return;

    const [firstItem, secondItem] = watchJournalLineItems;

    if (transactionType === 'SavingsDeposit' || transactionType === 'ShareCapDeposit') {
      setValue('journalLineItems.0', { ...firstItem, debit: watchPostedBalance, credit: 0 });
      setValue('journalLineItems.1', { ...secondItem, credit: watchPostedBalance, debit: 0 });
    } else {
      setValue('journalLineItems.0', { ...firstItem, credit: watchPostedBalance, debit: 0 });
      setValue('journalLineItems.1', { ...secondItem, debit: watchPostedBalance, credit: 0 });
    }
  }, [transactionType, watchJournalLineItems, watchPostedBalance]);
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
              <OutlinedInput
                defaultValue={
                  ['SavingsDeposit', 'ShareCapDeposit'].includes(transactionType) ? 'Deposit' : 'Withdrawal'
                }
              />
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
            <FormInputFields
              control={control}
              name="postedBalance"
              variant="number"
              isRequired
              inputLabel="Posting amount"
              errors={errors}
            />
            <FormInputFields
              control={control}
              name="reference"
              variant="text"
              inputLabel={['SavingsDeposit', 'ShareCapDeposit'].includes(transactionType) ? 'OR No.' : 'Voucher No.'}
              isRequired
              errors={errors}
            />
            <Stack justifyContent="flex-end" gap={2} flexDirection="row" marginTop={1}>
              <Button onClick={() => console.log(getValues())} type="button" variant="outlined">
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
