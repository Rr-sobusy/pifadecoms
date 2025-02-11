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
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { createInvoice } from '@/actions/invoices/create-invoice';
// types
import { invoiceSchema, type InvoiceSchemaType } from '@/actions/invoices/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface InvoiceCreateProps {
  members: { memberId: string; lastName: string; firstName: string }[];
  items: { itemId: string; itemName: string; itemType: 'product' | 'services'; rate: number }[];
}

const defaultValues = {
  invNumber: 'INV-*',
  lineItems: [],
  invDate: new Date(),
};

function calculateGrandTotal(lineItems: { lineId: string; itemId: string; quantity: number; rate: number }[]): number {
  return lineItems.reduce((curr, acc) => curr + acc.quantity * acc.rate, 0);
}

const InvoiceCreateForm2 = ({ members, items }: InvoiceCreateProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const router = useRouter();

  const lineItems = watch('lineItems');

  const grandTotal = calculateGrandTotal(lineItems);

  const { executeAsync, result, isExecuting } = useAction(createInvoice.bind(null, grandTotal));

  const handleAddLineItem = React.useCallback(() => {
    const _lineItems = watch('lineItems');

    setValue('lineItems', [
      ..._lineItems,
      {
        lineId: uuidv4(),
        itemId: '',
        quantity: 0,
        trade: 0,
        rate: 0,
      },
    ]);
  }, [getValues, setValue]);

  const handleRemoveLineItem = React.useCallback(
    (lineItemId: string) => {
      const lineItems = getValues('lineItems');

      setValue(
        'lineItems',
        lineItems.filter((lineItem) => lineItem.lineId !== lineItemId)
      );
    },
    [getValues, setValue]
  );

  React.useEffect(() => {
    if (result.data) {
      toast.success('New Invoice Created');
    }
  }, [result]);

  function submitHandler(data: InvoiceSchemaType) {
    executeAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Basic information</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="member"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        getOptionLabel={(member) => member.lastName + ' ' + member.firstName}
                        onChange={(_, value) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                        filterOptions={(options, { inputValue }) =>
                          options.filter(
                            ({ firstName, lastName }) =>
                              lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
                              firstName.toLowerCase().includes(inputValue.toLowerCase())
                          )
                        }
                        options={members}
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.member)} fullWidth>
                            <InputLabel required>Member Name</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.member ? <FormHelperText>{errors.member.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.memberId} value={options.memberId}>
                            {options.lastName + ' ' + options.firstName}
                          </Option>
                        )}
                      />
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
                    name="invNumber"
                    render={({ field }) => (
                      <FormControl disabled fullWidth>
                        <InputLabel>Number</InputLabel>
                        <OutlinedInput {...field} />
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
                    name="invDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="MMM D, YYYY"
                        label="Issue date *"
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        slotProps={{
                          textField: {
                            error: Boolean(errors.invDate),
                            fullWidth: true,
                            helperText: errors.invDate?.message,
                          },
                        }}
                        value={dayjs(field.value)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Line items</Typography>
              <Stack divider={<Divider />} spacing={2}>
                {lineItems.map((lineItem, index) => (
                  <Stack
                    direction="row"
                    key={lineItem.lineId}
                    spacing={3}
                    sx={{ alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <Controller
                      control={control}
                      name={`lineItems.${index}.itemId`}
                      render={({ field }) => (
                        <Autocomplete
                          sx={{ flex: '1 1 auto', minWidth: '200px' }}
                          getOptionLabel={(item) => item.itemName}
                          onChange={(_, value) => {
                            if (value) {
                              field.onChange(value.itemId);

                              // automatically set the item rate field to the rate incoded to that product chosen/
                              setValue(`lineItems.${index}`, {
                                ...getValues(`lineItems.${index}`),
                                rate: value.rate,
                              });
                            }
                          }}
                          options={items}
                          renderInput={(params) => (
                            <FormControl error={Boolean(errors.lineItems?.[index]?.itemId)} fullWidth>
                              <InputLabel required>Item Name</InputLabel>
                              <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                              {/* {errors.rootId ? <FormHelperText>{errors.rootId.message}</FormHelperText> : null} */}
                            </FormControl>
                          )}
                          renderOption={(props, options) => (
                            <Option {...props} key={options.itemName} value={options.itemName}>
                              {options.itemName}
                            </Option>
                          )}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.quantity`}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.lineItems?.[index]?.quantity)} sx={{ width: '140px' }}>
                          <InputLabel>Quantity</InputLabel>
                          <OutlinedInput
                            {...field}
                            inputProps={{ step: 1 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const value = event.target.valueAsNumber;

                              if (isNaN(value)) {
                                field.onChange('');
                                return;
                              }

                              if (value > 100) {
                                return;
                              }

                              field.onChange(parseInt(event.target.value));
                            }}
                            type="number"
                          />
                          {errors.lineItems?.[index]?.quantity ? (
                            <FormHelperText>{errors.lineItems[index].quantity.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.trade`}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.lineItems?.[index])} sx={{ width: '140px' }}>
                          <InputLabel>Trade</InputLabel>
                          <OutlinedInput
                            {...field}
                            inputProps={{ step: 0.01 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const value = event.target.valueAsNumber;

                              if (isNaN(value)) {
                                field.onChange('');
                                return;
                              }

                              field.onChange(parseFloat(value.toFixed(2)));
                            }}
                            startAdornment={<InputAdornment position="start">Php</InputAdornment>}
                            type="number"
                          />
                          {/* {errors.lineItems?.[index]?.unitPrice ? (
                            <FormHelperText>{errors.lineItems[index].unitPrice.message}</FormHelperText>
                          ) : null} */}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.rate`}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.lineItems?.[index])} sx={{ width: '140px' }}>
                          <InputLabel>Unit price</InputLabel>
                          <OutlinedInput
                            {...field}
                            inputProps={{ step: 0.01 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const value = event.target.valueAsNumber;

                              if (isNaN(value)) {
                                field.onChange('');
                                return;
                              }

                              field.onChange(parseFloat(value.toFixed(2)));
                            }}
                            startAdornment={<InputAdornment position="start">Php</InputAdornment>}
                            type="number"
                          />
                          {/* {errors.lineItems?.[index]?.unitPrice ? (
                            <FormHelperText>{errors.lineItems[index].unitPrice.message}</FormHelperText>
                          ) : null} */}
                        </FormControl>
                      )}
                    />
                    <IconButton
                      onClick={() => {
                        handleRemoveLineItem(lineItem.lineId);
                      }}
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Stack>
                ))}
                <div>
                  <Button
                    color="secondary"
                    onClick={handleAddLineItem}
                    startIcon={<PlusCircleIcon />}
                    variant="outlined"
                  >
                    Add item
                  </Button>
                </div>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">{formatToCurrency(grandTotal, 'Fil-ph', 'Php')}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Discount</Typography>
                    <Typography variant="body2">-</Typography>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tax</Typography>
                    <Typography variant="body2">-</Typography>
                  </Stack>

                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1">Base Grand Total</Typography>
                    <Typography variant="subtitle1">{formatToCurrency(grandTotal, 'Fil-ph', 'Php')}</Typography>
                  </Stack>
                </Stack>
              </Box>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button type="button" onClick={() => router.push(paths.dashboard.invoice.list)} color="secondary">
                  Cancel
                </Button>
                <Button disabled={isExecuting} type="submit" variant="contained">
                  {isExecuting ? 'Creating Invoice ...' : 'Create Invoice'}
                </Button>
              </CardActions>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default InvoiceCreateForm2;
