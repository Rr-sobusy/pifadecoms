'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import { paths } from '@/paths';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';

export interface Filters {
  memberName?: string;
  gender?: string;
}

export type SortDir = 'asc' | 'desc';

export interface MemberFilterProps {
  filters?: Filters;
  basePath?: string;
}

export function MemberFilters({ filters = {}, basePath }: MemberFilterProps): React.JSX.Element {
  const { memberName } = filters;

  const router = useRouter();

  const updateSearchParams = React.useCallback(
    (newFilters: Filters): void => {
      const searchParams = new URLSearchParams();

      if (newFilters.memberName) {
        searchParams.set('memberName', newFilters.memberName);
      }
      router.push(`${basePath}?${searchParams.toString()}`);
    },
    [router]
  );

  const handleClearFilters = React.useCallback(() => {
    router.push(basePath || '');
  }, [updateSearchParams]);

  const handleLastNameChange = React.useCallback(
    (value: string) => {
      updateSearchParams({ ...filters, memberName: value });
    },
    [updateSearchParams, filters]
  );

  const hasFilters = memberName;

  return (
    <div>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          <FilterButton
            displayValue={memberName}
            label="Member Name"
            onFilterApply={(value) => {
              handleLastNameChange(value as string);
            }}
            onFilterDelete={() => {
              handleLastNameChange('');
            }}
            popover={<LastNameFilterPopover />}
            value={memberName}
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
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by Member Name">
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
