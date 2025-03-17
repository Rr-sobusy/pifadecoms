'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
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

import { AccounTreeType } from '@/actions/accounts/types';
import { createNewItemSourceAction } from '@/actions/items/create-new-item-source';
import { itemSourceSchema, ItemSourceSchemaType } from '@/actions/items/types';
import { Option } from '@/components/core/option';

import { FormInputFields } from '../member-loans/InputFields';

type ItemSourceDialogProps = {
  isOpen: boolean;
  accounts: AccounTreeType;
};

function AddItemSourceDialog({ isOpen, accounts }: ItemSourceDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { execute } = useAction(createNewItemSourceAction);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemSourceSchemaType>({
    resolver: zodResolver(itemSourceSchema),
  });

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

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: ItemSourceSchemaType) {
    execute(data);
  }
  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '80%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">New Item Source</Typography>
              <Typography color="" variant="caption">
                Create new Item source
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={5}>
            <FormInputFields
              control={control}
              name="sourceName"
              inputLabel="Source name"
              variant="text"
              errors={errors.sourceName}
            />

            <Controller
              control={control}
              name="accountDetails"
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
                    <FormControl error={Boolean(errors.accountDetails)} fullWidth>
                      <InputLabel required>Default Account</InputLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                      {errors.accountDetails && <FormHelperText>{errors.accountDetails.message}</FormHelperText>}
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
          </Stack>
          <DialogAction>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogAction>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddItemSourceDialog;
