'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import { createParentAccountAction } from '@/actions/accounts/add-new-parent-account';
import { accountTypeSchema, AccountTypeSchema } from '@/actions/accounts/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface AddAccountTypeProps {
  open: boolean;
}

export const AddNewAccountTypeDialog = ({ open }: AddAccountTypeProps) => {
  const { execute, result, isExecuting } = useAction(createParentAccountAction);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AccountTypeSchema>({
    resolver: zodResolver(accountTypeSchema),
  });

  const router = useRouter();
  const handleClose = () => {
    router.push(paths.dashboard.finance.types);
  };

  //* Listen to server response
  React.useEffect(() => {
    if (result.data?.success) {
      toast.success('Account Type Created');
      router.push(paths.dashboard.finance.types);
      reset();
    }
  }, [result.data]);

  // form submit
  const submitHandler = (data: AccountTypeSchema) => {
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
            <Controller
              name="accountTypeName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.accountTypeName)}>
                  <InputLabel required>Account Name</InputLabel>
                  <OutlinedInput type="text" {...field} />
                  {errors.accountTypeName ? <FormHelperText>{errors.accountTypeName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              name="rootType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Root Name</InputLabel>
                  <Select {...field}>
                    {['Assets', 'Liability', 'Equity', 'Revenue', 'Expense', 'Contra_Assets'].map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              )}
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
