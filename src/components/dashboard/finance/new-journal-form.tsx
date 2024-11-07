'use client';

import React from 'react';
import { FormControlLabel } from '@mui/material';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';

import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

type NewJournalFromProps = {
  data: any;
};

function NewJournalFrom({ data }: NewJournalFromProps) {
  console.log(data);
  const { control } = useForm();
  return (
    <form action="">
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid
                size={{
                  md: 12,
                  xs: 12,
                }}
              >
                <Controller
                  name="rex"
                  control={control}
                  render={({ field }) => <DatePicker {...field} format="MMM D, YYYY" label="Issue date *" />}
                />
              </Grid>
              <Grid
                size={{
                  md: 12,
                  xs: 12,
                }}
              >
                <Controller
                  name="rex"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Journal Entry #</InputLabel>
                      <OutlinedInput disabled sx={{ maxWidth: 280 }} type="text" />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid
                size={{
                  md: 12,
                  xs: 12,
                }}
              >
                <Controller
                  name="rex"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel required>Reference #</InputLabel>
                      <OutlinedInput sx={{ maxWidth: 280 }} type="text" />
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <LineListTableView />
            <Divider sx={{marginTop: -3}} />
          </Stack>
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
