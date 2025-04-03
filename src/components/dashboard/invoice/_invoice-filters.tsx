'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';

export interface Filters {
  memberId?: string;
  endDate?: Date | string;
  invoiceId?: number;
  startDate?: Date | string;
}

const schema = zod
  .object({
    member: zod.object({
      memberId: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
    }),
    endDate: zod.date().max(new Date('2099-01-01')).nullable().optional(),
    invoiceId: zod.number().optional(),
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
    invoiceId: filters.invoiceId ?? 0,
    startDate: filters.startDate ? dayjs(filters.startDate).toDate() : null,
  };
}

export interface InvoiceFiltererProps {
  filters?: { memberId?: string; endDate?: Date; invoiceId?: number; startDate?: Date; status?: string };
  onFiltersApplied?: () => void;
  onFiltersCleared?: () => void;
  view?: 'group' | 'list';
}

export function InvoiceFilterer({
  filters = { endDate: new Date(), invoiceId: 0, memberId: '0', startDate: new Date(), status: '' },
  onFiltersApplied,
  onFiltersCleared,
  view,
}: InvoiceFiltererProps): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<Values>({ values: getDefaultValues(filters), resolver: zodResolver(schema) });

  const [member, setMemberData] = React.useState<MembersType['members']>([]);

  const memberData = watch('member');

  const debouncedValue = useDebounce(memberData?.lastName ?? '', 300);

  React.useEffect(() => {
    if (!debouncedValue) {
      setMemberData([]);
      return;
    }

    async function fetchMemberDataOnDebounce() {
      try {
        const data: MembersType['members'] = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {
        logger.debug(error);
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

      if (newFilters.invoiceId) {
        searchParams.set('invoiceId', String(newFilters.invoiceId));
      }

      if (newFilters.memberId) {
        searchParams.set('memberId', newFilters.memberId);
      }

      if (newFilters.startDate) {
        searchParams.set('startDate', String(newFilters.startDate));
      }

      if (newFilters.endDate) {
        searchParams.set('endDate', String(newFilters.endDate));
      }

      router.push(`${paths.dashboard.invoice.list}?${searchParams.toString()}`);
    },
    [router, view]
  );

  const handleApplyFilters = React.useCallback(
    (values: Values): void => {
      updateSearchParams({
        ...values,
        invoiceId: values.invoiceId,
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
  }, [updateSearchParams, onFiltersCleared]);

  return (
    <form onSubmit={handleSubmit(handleApplyFilters)}>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="invoiceId"
          render={({ field }) => (
            <FormControl error={Boolean(errors.invoiceId)}>
              <InputLabel>Invoice ID</InputLabel>
              <OutlinedInput
                {...field}
                onChange={(event) => {
                  const invId = event?.target.value;
                  if (invId) {
                    field.onChange(Number(invId));
                  }
                  return 0;
                }}
                type="number"
              />
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
              onChange={(_, value) => {
                field.onChange(value); // Update form value on selection
              }}
              options={member}
              getOptionLabel={(option) => (option.lastName.length ? `${option.lastName} ${option.firstName}` : '')}
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
