'use client';

import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { updateLoanStats } from '@/actions/loans/update-loan-stats';

interface LoanStatusToggler {
  isActive: boolean;
  loanId: bigint;
}

function LoanStatusToggler({ isActive, loanId }: LoanStatusToggler) {
  const [active, setActive] = React.useState(isActive);

  function handleToggleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setActive(event.target.checked);
  }

  React.useEffect(() => {
    if (isActive !== active) {
      updateLoanStats(loanId);
    }
  }, [active]);

  return (
    <FormControlLabel
      control={<Switch onChange={handleToggleChange} checked={active} defaultChecked />}
      label={active ? 'Active' : 'Closed'}
    />
  );
}

export default LoanStatusToggler;
