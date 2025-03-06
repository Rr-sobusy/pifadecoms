'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { MembersType } from '@/actions/members/types';

type Props = { members: MembersType };

function MemberDropDown({ members }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Autocomplete
      options={members}
      getOptionLabel={(member) => member.lastName + ', ' + member.firstName}
      filterOptions={(options, { inputValue }) => options.filter((option) => option.lastName || option.firstName)}
      onChange={(_, value) => router.push(`${pathname}?memberId=${value?.memberId}`)}
      renderInput={(params) => (
        <FormControl fullWidth>
          <InputLabel required>Member Name</InputLabel>
          <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
        </FormControl>
      )}
    />
  );
}

export default MemberDropDown;
