'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Option } from '@/components/core/option';
import { MembersType } from '@/actions/members/types';

interface Props { members: MembersType["members"] };

function MemberDropDown({ members }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Autocomplete
      options={members}
      getOptionLabel={(member) => member.lastName + ', ' + member.firstName + ' ' + (member?.middleName ?? '')}
      filterOptions={(options, { inputValue }) =>
        options.filter(
          (option) =>
            option.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.firstName.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      onChange={(_, value) => router.push(`${pathname}?memberId=${value?.memberId}`)}
      renderInput={(params) => (
        <FormControl fullWidth>
          <InputLabel required>Member Name</InputLabel>
          <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
        </FormControl>
      )}
      renderOption={(props, options) => (
        <Option {...props} key={options.memberId} value={options.memberId}>
          {options.lastName + ' ' + options.firstName + ', ' + (options.middleName ?? '')}
        </Option>
      )}
    />
  );
}

export default MemberDropDown;
