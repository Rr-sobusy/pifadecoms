'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import { createNewAccount } from '@/actions/accounts/add-new-child-account';
import { accountSchema, AccountSchemaType } from '@/actions/accounts/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../../core/InputFields';

interface AddAccountProps {
  open: boolean;
  accountType: { rootId: number; rootName: string; rootType: string }[];
}

export const AddNewAccountDiaglog = ({ open, accountType }: AddAccountProps) => {
  const { execute, result, isExecuting } = useAction(createNewAccount);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(accountSchema),
  });

  const router = useRouter();
  const handleClose = () => {
    router.push(paths.dashboard.finance.list);
  };

  //* Listen to server response
  React.useEffect(() => {
    if (result.data?.success) {
      toast.success('Financial Account created!');
      router.push(paths.dashboard.finance.list);
      reset();
    }
  }, [result]);

  // form submit
  const submitHandler = (data: AccountSchemaType) => {
    execute(data);
  };
  return (
    <Dialog
      maxWidth="xs"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
          >
            <Stack>
              <Typography variant="h6">Create new account</Typography>
              <Typography color="" variant="caption">
                Create account based to its financial category
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={3} marginTop={6} direction="column">
            <FormInputFields
              control={control}
              name="accountName"
              inputLabel="Account Name"
              errors={errors}
              isRequired
              variant="text"
            />
            <Controller
              name="rootId"
              control={control}
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
                  renderOption={(props, options) => (
                    <Option {...props} key={options.rootId} value={options.rootId}>
                      {`${options.rootName} (${options.rootType})`}
                    </Option>
                  )}
                />
              )}
            />
            <FormInputFields
              control={control}
              name="openingBalance"
              variant="number"
              isRequired
              inputLabel="Opening Balance"
            />
            <Stack marginTop={1}>
              <Button disabled={isExecuting} type="submit" variant="contained">
                Create Account
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};
