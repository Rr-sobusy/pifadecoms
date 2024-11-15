'use client';

import React from 'react';
import Typography, { FormControlLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import type { AccounTreeType } from '@/actions/accounts/types';
import { Option } from '@/components/core/option';
import { DataTable } from '@/components/core/data-table';

type NewJournalFromProps = {
  data: AccounTreeType;
};

function NewJournalFrom({ data }: NewJournalFromProps) {
  console.log(data);
  const { control } = useForm();

  const flattenedLabels = data.flatMap((group)=> group.Children.map((option)=>({
    ...option, group: group.rootName
  })))
  return (
    <form action="">
      <Card>
        <CardContent>
          <Box>
            <Box
              sx={{
                width: {
                  md: '100%',
                  lg: '40%',
                },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Controller
                name="rex"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Journal Entry #</InputLabel>
                    <OutlinedInput disabled type="text" defaultValue={'Journal No. - *'} />
                  </FormControl>
                )}
              />

              <Controller
                name="rex"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} format="MMM D, YYYY" sx={{ width: '100%' }} label="Posting date *" />
                )}
              />
              <Controller
                name="rex"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel required>Reference #</InputLabel>
                    <OutlinedInput type="text" />
                  </FormControl>
                )}
              />
              <Controller
                name="rex"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel required>Notes </InputLabel>
                    <OutlinedInput rows={3} multiline sx={{ minHeight: 80 }} type="text" />
                  </FormControl>
                )}
              />
              <Autocomplete
                options={flattenedLabels}
                groupBy={(option) => option.group} // Group options by category
                getOptionLabel={(option) => option.accountName} // Label to display
                renderInput={(params) => <TextField {...params} label="Select an option" />}
                renderOption={(props, option) => (
                  <Option
                    {...props}
                    value={option.accountId}
                    key={option.accountId}
                     // Optional: Indent for "tree-like" appearance
                  >
                   <span style={{marginLeft : 15}}>{option.accountName}</span>
                  </Option>
                )}
                fullWidth
              />
            </Box>
            <LineListTableView />
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}

function LineListTableView() {
  return (
    <DataTable
      columns={[
        {
          name: 'Account Name',
          formatter(row, index) {
            return row.accountName;
          },
        },
      ]}
      rows={[
        { id: 1, accountName: 'awrhaworh' },
        { id: 2, accountName: 'awrhaworh' },
      ]}
    />
  );
}

export default NewJournalFrom;
