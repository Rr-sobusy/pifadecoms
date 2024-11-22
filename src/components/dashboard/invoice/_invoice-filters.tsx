'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';
import { FormLabel } from '@mui/material';

export interface Filters {
  memberId?: string;
  endDate?: string;
  invoiceId?: string;
  startDate?: string;
  status?: string;
}

export type SortDir = 'asc' | 'desc';

const schema = zod
  .object({
    member: zod.object({
      memberId: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
    }),
    endDate: zod.date().max(new Date('2099-01-01')).nullable().optional(),
    invoiceId: zod.string().optional(),
    startDate: zod.date().max(new Date('2099-01-01')).nullable().optional(),
    status: zod.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }

      return true;
    },
    { message: 'End date should be greater than start date', path: ['endDate'] }
  );

type Values = zod.infer<typeof schema>;

function getDefaultValues(filters: Filters): Values {
  return {
    member: {
      firstName: '',
      memberId: '',
      lastName: '',
    },
    endDate: filters.endDate ? dayjs(filters.endDate).toDate() : null,
    invoiceId: filters.invoiceId ?? '',
    status: filters.status ?? '',
    startDate: filters.startDate ? dayjs(filters.startDate).toDate() : null,
  };
}

export interface InvoiceFiltererProps {
  filters?: Filters;
  onFiltersApplied?: () => void;
  onFiltersCleared?: () => void;
  sortDir?: SortDir;
  view?: 'group' | 'list';
}

export function InvoiceFilterer({
  filters = {},
  onFiltersApplied,
  onFiltersCleared,
  sortDir = 'desc',
  view,
}: InvoiceFiltererProps): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    getValues,
    setValue,
  } = useForm<Values>({ values: getDefaultValues(filters), resolver: zodResolver(schema) });

  const [member, setMemberData] = React.useState<{ memberId: string; lastName: string; firstName: string }[]>([]);

  const memberData = watch('member');

  const debouncedValue = useDebounce(memberData?.lastName ?? "", 300) ;

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
        console.log(data);
        setMemberData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMemberDataOnDebounce();
  }, [debouncedValue]);

  const updateSearchParams = React.useCallback(
    (newFilters: Filters) => {
      const searchParams = new URLSearchParams();

      // Keep view as sortDir search params

      if (view) {
        searchParams.set('view', view);
      }

      if (sortDir === 'asc') {
        searchParams.set('sortDir', sortDir);
      }

      if (newFilters.status) {
        searchParams.set('status', newFilters.status);
      }

      if (newFilters.invoiceId) {
        searchParams.set('invoiceId', newFilters.invoiceId);
      }

      if (newFilters.memberId) {
        searchParams.set('memberId', newFilters.memberId);
      }

      if (newFilters.startDate) {
        searchParams.set('startDate', newFilters.startDate);
      }

      if (newFilters.endDate) {
        searchParams.set('endDate', newFilters.endDate);
      }

      router.push(`${paths.dashboard.invoice.list}?${searchParams.toString()}`);
    },
    [router, sortDir, view]
  );

  const handleApplyFilters = React.useCallback(
    (values: Values): void => {
      updateSearchParams({
        ...values,
        memberId: values.member.memberId,
        startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : undefined,
        endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : undefined,
      });
      onFiltersApplied?.();
    },
    [updateSearchParams, onFiltersApplied]
  );

  const handleClearFilters = React.useCallback(() => {
    updateSearchParams({});
    onFiltersCleared?.();
  }, [updateSearchParams, onFiltersCleared,]);

  const hasFilters = filters.invoiceId || filters.memberId || filters.status || filters.startDate || filters.endDate;

  return (
    <form onSubmit={handleSubmit(handleApplyFilters)}>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="invoiceId"
          render={({ field }) => (
            <FormControl error={Boolean(errors.invoiceId)}>
              <InputLabel>Invoice ID</InputLabel>
              <OutlinedInput {...field} type="number" />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <FormControl error={Boolean(errors.status)} fullWidth>
              <InputLabel required>Status</InputLabel>
              <Select {...field}>
                <Option value="">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="paid">Paid</Option>
                <Option value="canceled">Canceled</Option>
              </Select>
            </FormControl>
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
              getOptionLabel={(options) => `${options.lastName}, ${options.firstName}`}
              renderInput={(params) => (
                <FormControl fullWidth>
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
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              format="MMM D, YYYY"
              label="From"
              onChange={(date) => {
                field.onChange(date ? date.toDate() : null);
              }}
              slotProps={{ textField: { error: Boolean(errors.startDate), helperText: errors.startDate?.message } }}
              value={field.value ? dayjs(field.value) : null}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePicker
              format="MMM D, YYYY"
              label="To"
              onChange={(date) => {
                field.onChange(date ? date.toDate() : null);
              }}
              slotProps={{ textField: { error: Boolean(errors.endDate), helperText: errors.endDate?.message } }}
              value={field.value ? dayjs(field.value) : null}
            />
          )}
        />
        <Button disabled={!isDirty} type="submit" variant="contained">
          Apply
        </Button>

        <Button color="secondary" onClick={handleClearFilters}>
          Clear filters
        </Button>
      </Stack>
    </form>
  );
}
