'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';

import { useCustomersSelection } from '../customer/customers-selection-context';

// The tabs should be generated using API data.

export interface Filters {
  lastName?: string;
  gender?: string;
}

export type SortDir = 'asc' | 'desc';

export interface MemberFilterProps {
  filters?: Filters;
}

export function MemberFilters({ filters = {} }: MemberFilterProps): React.JSX.Element {
  const { lastName } = filters;

  const router = useRouter();

  const updateSearchParams = React.useCallback(
    (newFilters: Filters): void => {
      const searchParams = new URLSearchParams();

      if (newFilters.lastName) {
        searchParams.set('lastName', newFilters.lastName);
      }
      router.push(`${paths.dashboard.members.list}?lastName=${newFilters.lastName}`);
    },
    [router]
  );

  const handleClearFilters = React.useCallback(() => {
    router.push(`${paths.dashboard.members.list}`);
  }, [updateSearchParams]);

  const handleLastNameChange = React.useCallback(
    (value: string) => {
      updateSearchParams({ ...filters, lastName: value });
    },
    [updateSearchParams, filters]
  );

  const hasFilters = lastName;

  return (
    <div>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          <FilterButton
            displayValue={lastName}
            label="Last Name"
            onFilterApply={(value) => {
              handleLastNameChange(value as string);
            }}
            onFilterDelete={() => {
              handleLastNameChange('');
            }}
            popover={<LastNameFilterPopover />}
            value={lastName}
          />
          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>
      </Stack>
    </div>
  );
}

function LastNameFilterPopover(): React.JSX.Element {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = React.useState<string>((initialValue as string) || '');

  React.useEffect(() => {
    setValue((initialValue as string | undefined) ?? '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by Last Name">
      <FormControl>
        <OutlinedInput
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              onApply(value);
            }
          }}
          value={value}
        />
      </FormControl>
      <Button
        onClick={() => {
          onApply(value);
        }}
        variant="contained"
      >
        Apply
      </Button>
    </FilterPopover>
  );
}
