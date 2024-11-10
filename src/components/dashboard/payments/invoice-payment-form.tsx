'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';

import { InvoiceType, SingleInvoiceType } from '@/actions/invoices/types';
import { color } from '@mui/system';
import { formatToCurrency } from '@/lib/format-currency';

type PageProps = {
  value: SingleInvoiceType;
};

function InvoicePaymentForm({ value }: PageProps) {
  const { control } = useForm();

  console.log(value);
  return (
    <form>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={4}>
              <Typography variant="h6">Payment Details</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={() => (
                      <FormControl fullWidth>
                        <InputLabel required>Member Name</InputLabel>
                        <OutlinedInput
                          disabled
                          defaultValue={value?.Members.lastName + ', ' + value?.Members.firstName}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={() => (
                      <FormControl fullWidth>
                        <InputLabel required>Payment No.</InputLabel>
                        <OutlinedInput disabled defaultValue={`PAY - *`} />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={() => (
                      <FormControl fullWidth>
                        <InputLabel required>Invoice No.</InputLabel>
                        <OutlinedInput
                          disabled
                          defaultValue={`INV - ` + value?.invoiceId.toString().padStart(6, '0')}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <DatePicker
                          {...field}
                          format="MMM D, YYYY"
                          label="Payment date *"
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={() => (
                      <FormControl fullWidth>
                        <InputLabel required>Amount Received <span>{`(${formatToCurrency(value?.outStandingAmt ?? 0, 'Fil-ph', 'Php')} due)`}</span></InputLabel>
                        <OutlinedInput
                        type='number'
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="rex"
                    render={() => (
                      <FormControl fullWidth>
                        <InputLabel required>Amount Received <span>{`(${formatToCurrency(value?.outStandingAmt ?? 0, 'Fil-ph', 'Php')} due)`}</span></InputLabel>
                        <OutlinedInput
                        type='number'
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}

export default InvoicePaymentForm;
