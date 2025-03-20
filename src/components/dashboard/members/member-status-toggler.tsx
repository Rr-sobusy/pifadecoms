'use client';

import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { toggleMemberStats } from '@/actions/members/toggle-status';

interface Props {
  isActive: boolean;
  memberId: string;
}

function MemberStatusToggler({ isActive, memberId }: Props) {
  const [checked, setChecked] = React.useState(isActive);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    if (isActive !== checked) {
      toggleMemberStats(memberId);
    }
  }, [checked]);

  return (
    <FormControlLabel
      control={<Switch onChange={handleChange} checked={isActive} defaultChecked />}
      label="Toggle member status"
    />
  );
}

export default MemberStatusToggler;
