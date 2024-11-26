'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FileDashed } from '@phosphor-icons/react';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { createNewAccount } from '@/actions/accounts/add-new-child-account';
import { AccounTreeType, accountSchema, AccountSchemaType, AccountType } from '@/actions/accounts/types';
import type { FundTransactions, MemberFundsType } from '@/actions/funds/types';
import { IAddMemberSchema, memberFundsSchema } from '@/actions/funds/types';
import { Option } from '@/components/core/option';

interface CreateSavingsTransactionProps {
  open: boolean;
  fundTransactions: FundTransactions;
  accounts: AccounTreeType;
  fundId: string;
}

export const CreateSavingsTransaction = ({ open, fundTransactions, accounts , fundId}: CreateSavingsTransactionProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IAddMemberSchema>({
    resolver: zodResolver(memberFundsSchema),
    defaultValues: {
      fundId:Number(fundId),
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

  const submitHandler = (data: IAddMemberSchema) => {
    console.log(data);
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
                Transact member's savings
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
                    <FormControl fullWidth>
                      <InputLabel required>Depositing Acct. (Dr)</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
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
                    <FormControl fullWidth>
                      <InputLabel required>Crediting Acct. (Cr)</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
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
                <FormControl>
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
                </FormControl>
              )}
            />
            <FormControl>
              <InputLabel required>OR No.</InputLabel>
              <OutlinedInput />
            </FormControl>
            <Stack justifyContent="flex-end" gap={2} flexDirection="row" marginTop={1}>
              <Button type="button" onClick={() => console.log(errors)} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Post transaction
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};
