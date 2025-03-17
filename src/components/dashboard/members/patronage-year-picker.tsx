'use client';

import { url } from 'inspector';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

type Props = {};

function PatronageYearPicker({}: Props) {
  const router = useRouter();
  const currentParams = useSearchParams();

  const addQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(currentParams.toString());
    params.set(key, value); // Add or update query param

    router.push(`?${params.toString()}`, { scroll: false }); // Update URL without reloading
  };
  return (
    <FormControl>
      <InputLabel htmlFor="patronage-year">Fiscal Year</InputLabel>
      <Select
        onChange={(event) => {
          const year = event.target.value;
          if (year === 'current') {
            addQueryParam('filterYear', dayjs().year().toString());
          } else {
            addQueryParam('filterYear', year);
          }
        }}
        defaultValue={'current'}
        id="patronage-year"
        label="Year"
      >
        <Option value="current">Current Year</Option>
        <Option value="2025">2025</Option>
        <Option value="2026">2026</Option>
        <Option value="2027">2027</Option>
        <Option value="2028">2028</Option>
        <Option value="2029">2029</Option>
      </Select>
    </FormControl>
  );
}

export default PatronageYearPicker;
