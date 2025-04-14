import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CardHeader } from '@mui/material';

type Props = {};

function LoanStatsCard({}: Props) {
  return (
    <Card>
      <CardContent>
        <CardHeader title="Loan Status" />
        <FormControlLabel control={<Switch checked defaultChecked />} label="Active" />
      </CardContent>
    </Card>
  );
}

export default LoanStatsCard;
