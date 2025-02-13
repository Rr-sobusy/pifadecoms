'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import useDebounce from '@/lib/api-utils/use-debounce';
import type { MembersType } from '@/actions/members/types';
import { Option } from '@/components/core/option';

const filterSchema = zod.object({
  loanId: zod.number().optional(),
  status: zod.enum(['All', 'Running', 'Overdue', 'Paid']).optional(),
  member: zod.object({ memberId: zod.string(), firstName: zod.string(), lastName: zod.string() }).optional(),
});

function LoanFilters() {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<zod.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });
  const [member, setMemberData] = React.useState<MembersType[0][]>([]);
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
        const data: MembersType = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {}
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
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <Typography variant='h6'>Filters</Typography>
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
              name="status"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel required>Status</InputLabel>
                  <Select {...field}>
                    <Option value="All">All</Option>
                    <Option value="Running">Running</Option>
                    <Option value="Overdue">Overdue</Option>
                    <Option value="Paid">Paid</Option>
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
            <Button type="submit" variant="contained">
              Apply
            </Button>

            <Button onClick={() => console.log(errors)} color="secondary">
              Clear filters
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}

export default LoanFilters;
