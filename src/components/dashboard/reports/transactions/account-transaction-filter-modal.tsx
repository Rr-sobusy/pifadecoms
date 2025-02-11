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
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Decimal from 'decimal.js';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import type { AccounTreeType } from '@/actions/accounts/types';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';

type FilterModalProps = {
  open: boolean;
  accounts: AccounTreeType;
};

const filterSchema = zod.object({
  startDate: zod.date().optional(),
  endDate: zod.date().optional(),
  accountDetails: zod
    .object({
      accountId: zod.string(),
      accountName: zod.string(),
      createdAt: zod.date().optional(),
      rootId: zod.number().optional(),
      openingBalance: zod.preprocess((val) => new Decimal(val as number), zod.instanceof(Decimal)),
      runningBalance: zod.preprocess((val) => new Decimal(val as number), zod.instanceof(Decimal)),
      updatedAt: zod.date().optional(),
      isActive: zod.boolean().optional(),
      group: zod.string(),
      rootType: zod.enum(['Assets', 'Liability', 'Equity', 'Revenue', 'Expense']).optional(),
    })
    .optional(),
  member: zod
    .object({
      memberId: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
    })
    .optional(),
});

type FilterSchema = zod.infer<typeof filterSchema>;

function FilterModal({ open, accounts }: FilterModalProps) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
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
    },
  });

  const [member, setMemberData] = React.useState<MembersType[0][]>([]);

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

  const memberData = watch('member');

  const debouncedValue = useDebounce(memberData?.lastName ?? '', 300);

  React.useEffect(() => {
    if (!debouncedValue) {
      setMemberData([]);
      return;
    }

    async function fetchMemberDataOnDebounce() {
      try {
        const data: MembersType = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {}
    }
    fetchMemberDataOnDebounce();
  }, [debouncedValue]);

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: FilterSchema) {
    const searchParams = new URLSearchParams();
    if (data.accountDetails) {
      searchParams.set('accountId', data.accountDetails.accountId);
    }
    if (data.member) {
      searchParams.set('memberId', data.member.memberId);
    }
    if (data.startDate) {
      searchParams.set('startDate', String(data.startDate));
    }
    if (data.endDate) {
      searchParams.set('endDate', String(data.endDate));
    }

    router.push(`${pathname}?${searchParams.toString()}`);
  }
  return (
    <Dialog
      maxWidth="md"
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '60%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
          >
            <Stack>
              <Typography variant="h6">Filter results</Typography>
              <Typography color="text.secondary" variant="caption">
                Filter the data table based on filter inputs.
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Grid spacing={2} container>
              <Grid
                size={{
                  sm: 12,
                  md: 6,
                }}
              >
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.startDate),
                          fullWidth: true,
                          helperText: errors.startDate?.message,
                        },
                      }}
                      value={dayjs(field.value)}
                      label="Start Date"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid
                size={{
                  sm: 12,
                  md: 6,
                }}
              >
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.endDate),
                          fullWidth: true,
                          helperText: errors.endDate?.message,
                        },
                      }}
                      value={dayjs(field.value)}
                      label="End Date"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
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
                    <FormControl error={Boolean(errors.accountDetails?.message)} fullWidth>
                      <InputLabel>Filter by account</InputLabel>
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
              name="member"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onInputChange={(_, value) => {
                    if (!value) {
                      return setValue('member.lastName', '');
                    }

                    setValue('member.lastName', value); // Update form value when input changes
                  }}
                  onChange={(event, value) => {
                    field.onChange(value); // Update form value on selection
                  }}
                  options={member}
                  getOptionLabel={(option) =>
                    option && option.lastName && option.firstName ? `${option.lastName} ${option.firstName}` : ''
                  }
                  renderInput={(params) => (
                    <FormControl error={Boolean(errors.member?.message)} fullWidth>
                      <FormLabel>Member Name</FormLabel>
                      <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                    </FormControl>
                  )}
                  renderOption={(props, options) => (
                    <Option {...props} key={options.memberId} value={options.memberId}>
                      {`${options.lastName}, ${options.firstName}`}
                    </Option>
                  )}
                />
              )}
            />
            <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
              Filter
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FilterModal;
