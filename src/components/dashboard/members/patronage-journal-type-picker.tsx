"use client"

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { JournalType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

type Props = {};

const JournalsTypes: Record<string, JournalType> = {
  'Cash Receipts': 'cashReceipts',
  'Cash Disbursements': 'cashDisbursement',
  'General Journal': 'generalJournal',
};

function PatronageJournalTypePicker({}: Props) {
  const router = useRouter();
  const currentParams = useSearchParams();

  const addQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(currentParams.toString());
    params.set(key, value); // Add or update query param

    router.push(`?${params.toString()}`, { scroll: false }); // Update URL without reloading
  };
  return (
    <FormControl>
      <InputLabel htmlFor="patronage-year">Journal Type</InputLabel>
      <Select
        onChange={(event) => {
          const year = event.target.value;
          if (year === 'current') {
            addQueryParam('journalType', dayjs().year().toString());
          } else {
            addQueryParam('journalType', year);
          }
        }}
        defaultValue={'cashReceipts'}
        id="patronage-year"
        label="Journal Type"
      >
        {Object.entries(JournalsTypes).map(([label, value]) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}

export default PatronageJournalTypePicker;
