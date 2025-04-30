'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import type { ItemSourcesType } from '@/actions/items/types';
import { Option } from '@/components/core/option';

interface ItemSourceDropdownProps {
  itemSources: ItemSourcesType;
}

function ItemSourceDropdown({ itemSources }: ItemSourceDropdownProps) {
  const router = useRouter();
  const _searchParams = useSearchParams();

  function selectHandler(event: SelectChangeEvent) {
    if (event.target.value === 'all') {
      const searchParams = new URLSearchParams(_searchParams.toString());
      searchParams.delete('itemSource');
      router.push(`?${searchParams.toString()}`);
    }

    const searchParams = new URLSearchParams(_searchParams.toString());
    searchParams.set('itemSource', event.target.value);
    router.push(`?${searchParams.toString()}`);
  }

  return (
    <FormControl disabled={_searchParams.toString().length === 0}>
      <InputLabel>Item Source</InputLabel>
      <Select onChange={selectHandler}>
        <Option value={'all'}>All</Option>
        {itemSources.map((itemSource) => (
          <Option value={itemSource.itemSourceId} key={itemSource.itemSourceId}>
            {itemSource.itemSourceName}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}

export default ItemSourceDropdown;
