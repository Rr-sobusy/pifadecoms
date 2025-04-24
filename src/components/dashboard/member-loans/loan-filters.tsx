'use client';

import { url } from 'inspector';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { RepaymentStyle } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { ILoanSources } from '@/actions/loans/types';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';

const filterSchema = zod.object({
  loanId: zod.number().optional(),
  status: zod.enum(['All', 'Active', 'Closed']).optional(),
  member: zod.object({ memberId: zod.string(), firstName: zod.string(), lastName: zod.string() }).optional(),
  sourceId: zod.number().optional(),
  contractType: zod.enum(['StraightPayment', 'Diminishing', 'OneTime']).optional(),
  releasedDate: zod
    .object({
      from: zod.date().max(new Date('2099-01-01')).nullable().optional(),
      to: zod.date().max(new Date('2099-01-01')).nullable().optional(),
    })
    .optional(),
  dueDate: zod.date().max(new Date('2099-01-01')).nullable().optional(),
});

const repStyleMap: Record<RepaymentStyle, string> = {
  StraightPayment: 'Straight Payment',
  Diminishing: 'Diminishing',
  OneTime: 'End of term',
};

interface LoanFiltersProps {
  loanSource: ILoanSources;
}

type FilterValues = zod.infer<typeof filterSchema>;

function getDefaultValues(filters: FilterValues): FilterValues {
  return {
    status: filters.status ?? 'All',
    loanId: filters.loanId ?? 0,
    member: undefined,
  };
}

function LoanFilters({ loanSource }: LoanFiltersProps) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<zod.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: getDefaultValues({}),
  });
  const [member, setMemberData] = React.useState<MembersType['members'][0][]>([]);
  const router = useRouter();
  const pathname = usePathname();
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

  function submitHandler(data: zod.infer<typeof filterSchema>): void {
    const urlSearchParams = new URLSearchParams();
    if (data.loanId) {
      urlSearchParams.set('loanId', data.loanId.toString());
    }
    if (data.status) {
      urlSearchParams.set('status', data.status);
    }
    if (data.member) {
      urlSearchParams.set('memberId', data.member.memberId);
    }
    if (data.sourceId) {
      urlSearchParams.set('sourceId', data.sourceId.toString());
    }
    if (data.contractType) {
      urlSearchParams.set('contractType', data.contractType);
    }

    if (data.releasedDate?.from) {
      urlSearchParams.set('releasedDateFrom', data.releasedDate.from.toString());
    }
    
    if (data.releasedDate?.to) {
      urlSearchParams.set('releasedDateTo', data.releasedDate.to.toString());
    }

    if (data.dueDate) {
      urlSearchParams.set('dueDate', data.dueDate.toString());
    }
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  function clearFilterHandler() {
    reset();
    submitHandler({});
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <Typography variant="h6">Filters</Typography>
          <Stack marginTop={2} spacing={3}>
            <Controller
              control={control}
              name="loanId"
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Loan ID</InputLabel>
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
                  onChange={(event, value) => {
                    field.onChange(value); // Update form value on selection
                  }}
                  options={member}
                  getOptionLabel={(option) =>
                    option && option.lastName && option.firstName ? `${option.lastName} ${option.firstName}` : ''
                  }
                  renderInput={(params) => (
                    <FormControl fullWidth>
                      <FormLabel>Loaner Name</FormLabel>
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
              name="status"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field}>
                    <Option value="All">All</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Closed">Closed</Option>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="sourceId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Loan source</InputLabel>
                  <Select {...field}>
                    {loanSource.map((source) => (
                      <Option key={source.sourceId} value={source.sourceId}>
                        {source.sourceName}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="contractType"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Contract Type</InputLabel>
                  <Select {...field}>
                    {Object.entries(repStyleMap).map(([key, value]) => (
                      <Option key={key} value={key}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Divider />
            <FormControl>
              <InputLabel>Released date</InputLabel>
              <Box gap={2} display="flex" flexDirection="column">
                <Controller
                  control={control}
                  name="releasedDate.from"
                  render={({ field }) => (
                    <DatePicker
                      label="From"
                      {...field}
                      onChange={(date) => field.onChange(date?.toDate())}
                      value={field.value ? dayjs(field.value) : null}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="releasedDate.to"
                  render={({ field }) => (
                    <DatePicker
                      label="From"
                      {...field}
                      onChange={(date) => field.onChange(date?.toDate())}
                      value={field.value ? dayjs(field.value) : null}
                    />
                  )}
                />
              </Box>
            </FormControl>
            <Divider />
            <Box gap={2} display="flex" flexDirection="column">
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <DatePicker
                    label="Due date (From start to current selected)"
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.toDate())}
                  />
                )}
              />
            </Box>
            <Button type="submit" variant="contained">
              Apply
            </Button>

            <Button onClick={clearFilterHandler} color="secondary">
              Clear filters
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}

export default LoanFilters;
