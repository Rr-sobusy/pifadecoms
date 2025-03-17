'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { dayjs } from '@/lib/dayjs';
import { createMemberIntoFunds } from '@/actions/funds/create-member-in-fund';
import { addMemberIntoFundsSchema, type IAddMemberIntoFunds } from '@/actions/funds/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface AddFundsMemberProps  {
  open?: boolean;
  membersList: { memberId: string; lastName: string; firstName: string }[];
};

function AddFundsMember({ open = true, membersList }: AddFundsMemberProps) {
  const pathName = usePathname();
  const router = useRouter();

  const { execute, result } = useAction(createMemberIntoFunds);

  const {
    control,
    reset,
    handleSubmit,
  } = useForm<IAddMemberIntoFunds>({
    resolver: zodResolver(addMemberIntoFundsSchema),
    defaultValues: {
      dateAdded: new Date(),
    },
  });

  //* listen to the form result
  React.useEffect(() => {
    if (result.data) {
      reset();
      handleClose();
      toast.success("New member fund added.")
    }
  }, [result]);

  function handleClose() {
    router.push(pathName);
  }

  function submitHandler(data: IAddMemberIntoFunds) {
    execute(data);
  }
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '90%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">Add New Member to Fund</Typography>
              <Typography color="error" variant="caption">
                (Non-journal posting)
              </Typography>
              <Typography color="" variant="caption">
                Create initial record for member savings and share
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Controller
              name="dateAdded"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  onChange={(date) => {
                    field.onChange(date?.toDate());
                  }}
                  value={dayjs(field.value)}
                  label="Date Created."
                />
              )}
            />
            <Controller
              name="member"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => {
                    if (value) field.onChange(value);
                  }}
                  options={membersList}
                  getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
                  renderInput={(params) => (
                    <FormControl fullWidth>
                      <InputLabel>Member Name</InputLabel>
                      <Typography variant="caption">(Members that still not listed on fund list.)</Typography>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} type="text" />
                    </FormControl>
                  )}
                  filterOptions={(options, { inputValue }) =>
                    options.filter(
                      ({ firstName, lastName }) =>
                        lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
                        firstName.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  renderOption={(props, option) => (
                    <Option {...props} key={option.memberId} value={option.memberId}>
                      {`${option.lastName}, ${option.firstName}`}
                    </Option>
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="initialShareCapBalance"
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Initial Shared Cap. Balance</InputLabel>
                  <OutlinedInput
                    {...field}
                    onChange={(event) => {
                      const amount = event.target.value;
                      field.onChange(Number(amount));
                    }}
                    type="number"
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="initialSavingsBalance"
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Initial Member Savings Balance</InputLabel>
                  <OutlinedInput
                    {...field}
                    onChange={(event) => {
                      const amount = event.target.value;
                      field.onChange(Number(amount));
                    }}
                    type="number"
                  />
                </FormControl>
              )}
            />
          </Stack>
          <Stack justifyContent="flex-end" gap={2} flexDirection="row" marginTop={1}>
            <Button type="button">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Member
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddFundsMember;
