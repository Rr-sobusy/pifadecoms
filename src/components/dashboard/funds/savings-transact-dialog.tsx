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
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import { createNewAccount } from '@/actions/accounts/add-new-child-account';
import { accountSchema, AccountSchemaType, AccountType } from '@/actions/accounts/types';
import type { FundTransactions, MemberFundsType } from '@/actions/funds/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface CreateSavingsTransactionProps {
  open: boolean;
  fundTransactions: FundTransactions;
}

export const CreateSavingsTransaction = ({ open, fundTransactions }: CreateSavingsTransactionProps) => {
  console.log(fundTransactions);

  const router = useRouter();
  const pathName = usePathname();
  const submitHandler = (data: AccountSchemaType) => {};

  const handleClose = () => {
    router.push(pathName);
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
      <form>
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
            <DatePicker label="Date Posted" />
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <FormControl fullWidth>
                  <InputLabel required>Depositing Acct. (Dr)</InputLabel>
                  <OutlinedInput />
                </FormControl>
              )}
              renderOption={(props, option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              )}
            />
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <FormControl fullWidth>
                  <InputLabel required>Crediting Acct. (Cr)</InputLabel>
                  <OutlinedInput />
                </FormControl>
              )}
              renderOption={(props, option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              )}
            />
            <FormControl>
              <InputLabel required>Posting Amount</InputLabel>
              <OutlinedInput type="number" />
            </FormControl>
            <FormControl>
              <InputLabel required>OR No.</InputLabel>
              <OutlinedInput />
            </FormControl>
            {/* <Controller
              name="accountName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.accountName)}>
                  <InputLabel required>Account Name</InputLabel>
                  <OutlinedInput type="text" {...field} />
                  {errors.accountName ? <FormHelperText>{errors.accountName.message}</FormHelperText> : null}
                </FormControl>
              )}
            /> */}
            {/* <Controller
              name="rootId"
              control={[]}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  getOptionLabel={(account) => account.rootName}
                  onChange={(_, value) => {
                    if (value) {
                      field.onChange(value);
                    }
                  }}
                  options={accountType}
                  renderInput={(params) => (
                    <FormControl error={Boolean(errors.rootId)} fullWidth>
                      <InputLabel required>Account Type</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                      {errors.rootId ? <FormHelperText>{errors.rootId.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                //   renderOption={(props, options) => (
                //     <Option {...props} key={options.rootId} value={options.rootId}>
                //       {`${options.rootName} (${options.rootType})`}
                //     </Option>
                //   )}
                />
              )}
            />
            <Controller
              name="openingBalance"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.openingBalance)}>
                  <InputLabel required>Opening Balance</InputLabel>
                  <OutlinedInput type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  {errors.openingBalance ? <FormHelperText>{errors.openingBalance.message}</FormHelperText> : null}
                </FormControl>
              )}
            /> */}
            <Stack marginTop={1}>
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
