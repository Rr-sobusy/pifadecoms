'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FunnelSimple } from '@phosphor-icons/react/dist/ssr';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Decimal from 'decimal.js';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import type { AccounTreeType } from '@/actions/accounts/types';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';

type FilterModalProps = {
  accounts: AccounTreeType;
};

const maximumDateInterval = 31;

const filterSchema = zod.object({
  dateRange: zod
    .object({
      startDate: zod.date().optional(),
      endDate: zod.date().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data?.endDate || !data?.startDate) return;

      if (data.startDate > data.endDate) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Start date must preceeding end date! ',
        });
      }

      if (dayjs(data?.endDate).diff(dayjs(data?.startDate), 'day') > maximumDateInterval) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'To minimize potential performance problems, date ranges must not more than 1 month. ',
        });
      }
    })
    .optional(),
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
      rootType: zod.enum(['Assets', 'Liability', 'Equity', 'Revenue', 'Expense', 'Contra_Assets']).optional(),
    })
    .optional(),
  member: zod
    .object({
      memberId: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
    })
    .optional(),
  journalType: zod.enum(['cashReceipts', 'cashDisbursement', 'generalJournal']).optional(),
});

type FilterSchema = zod.infer<typeof filterSchema>;

function FilterModal({ accounts }: FilterModalProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isOpenFromParams = searchParams.get('filterList') === 'true';

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDialogOpen !== isOpenFromParams) {
      setDialogOpen(isOpenFromParams);
    }
  }, [isOpenFromParams]);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
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

  const [member, setMemberData] = React.useState<MembersType['members'][0][]>([]);

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
        const response = await fetch('/dashboard/members/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memberName: debouncedValue }),
        });

        if (!response.ok) throw new Error('Failed to fetch member data');

        const data: MembersType['members'] = await response.json();
        setMemberData(data);
      } catch (error) {
        logger.debug('Error fetching members:', error);
      }
    }
    fetchMemberDataOnDebounce();
  }, [debouncedValue]);

  function handleClose() {
    router.push(pathname);
  }

  function submitHandler(data: FilterSchema) {
    const searchParams = new URLSearchParams();
    if (data.accountDetails?.accountId.length) {
      searchParams.set('accountId', data.accountDetails.accountId);
    }
    if (data.member) {
      searchParams.set('memberId', data.member.memberId);
    }
    if (data.dateRange?.startDate) {
      searchParams.set('startDate', String(data.dateRange?.startDate));
    }
    if (data.dateRange?.endDate) {
      searchParams.set('endDate', String(data.dateRange?.endDate));
    }
    if (data.journalType) {
      searchParams.set('journalType', String(data.journalType));
    }

    router.push(`${pathname}?${searchParams.toString()}`);
    reset();
  }
  return (
    <Dialog
      maxWidth="md"
      open={isDialogOpen}
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
                Filter the data table based on filter inputs
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
                  name="dateRange.startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.dateRange?.startDate),
                          fullWidth: true,
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
                  name="dateRange.endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.dateRange?.endDate),
                          fullWidth: true,
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
              name="journalType"
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Journal Type</InputLabel>
                  <Select {...field}>
                    <Option value="cashReceipts">Cash Receipts</Option>
                    <Option value="cashDisbursement">Cash Disbursement</Option>
                    <Option value="generalJournal">General Journal</Option>
                  </Select>
                </FormControl>
              )}
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
                    field.onChange(value); // Update form value on selectio
                  }}
                  options={member}
                  getOptionLabel={(option) => (option.lastName.length ? `${option.lastName} ${option.firstName}` : '')}
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
            {errors.dateRange && (
              <Typography variant="subtitle2" color="error">
                {errors.dateRange && errors.dateRange.root?.message}
              </Typography>
            )}
            <div>
              <Stack flexDirection="row" justifyContent="end">
                <Button startIcon={<FunnelSimple />} type="submit" sx={{ marginTop: 2 }} variant="contained">
                  Filter
                </Button>
              </Stack>
            </div>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FilterModal;
