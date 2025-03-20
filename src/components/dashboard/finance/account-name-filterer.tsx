'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';

export interface Filters {
  accountName?: string;
  gender?: string;
}

export type SortDir = 'asc' | 'desc';

export interface MemberFilterProps {
  filters?: Filters;
  basePath?: string;
}

export function AccountNameFilterrs({ filters = {}, basePath }: MemberFilterProps): React.JSX.Element {
  const { accountName } = filters;

  const router = useRouter();

  const updateSearchParams = React.useCallback(
    (newFilters: Filters): void => {
      const searchParams = new URLSearchParams();

      if (newFilters.accountName) {
        searchParams.set('accountName', newFilters.accountName);
      }
      router.push(`${basePath}?${searchParams.toString()}`);
    },
    [router]
  );

  const handleClearFilters = React.useCallback(() => {
    router.push(basePath || '');
  }, [updateSearchParams]);

  const handleAccountNameChange = React.useCallback(
    (value: string) => {
      updateSearchParams({ ...filters, accountName: value });
    },
    [updateSearchParams, filters]
  );

  const hasFilters = accountName;

  return (
    <div>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          <FilterButton
            displayValue={accountName}
            label="Account Name"
            onFilterApply={(value) => {
              handleAccountNameChange(value as string);
            }}
            onFilterDelete={() => {
              handleAccountNameChange('');
            }}
            popover={<AccountNamePopover />}
            value={accountName}
          />
          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>
      </Stack>
    </div>
  );
}

function AccountNamePopover(): React.JSX.Element {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = React.useState<string>((initialValue as string) || '');

  React.useEffect(() => {
    setValue((initialValue as string | undefined) ?? '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by Account Name">
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
