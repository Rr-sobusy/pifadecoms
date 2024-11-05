'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { EditorEvents } from '@tiptap/react';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import type { AccountType } from '@/actions/accounts/types';
import { createNewItems } from '@/actions/items/create-new-item';
// schema and types
import { itemSchema, ItemsSchemaType } from '@/actions/items/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

type ItemCreateFormProps = {
  accounts?: { accountId: string; accountName: string; accountRootType: AccountType[0]['RootID']['rootType'] }[];
};

function ItemCreateForm({ accounts }: ItemCreateFormProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ItemsSchemaType>({ resolver: zodResolver(itemSchema), defaultValues: {} });

  const { execute, result } = useAction(createNewItems);

  const onSubmit = (ItemSchema: ItemsSchemaType) => {
    try {
      execute(ItemSchema);

      if (!result.serverError) {
        toast.success('New item created.');
        router.push(paths.dashboard.items.list);
      }
    } catch (error) {
      toast.error('Error occured in server');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    name="itemName"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.itemName)} fullWidth>
                        <InputLabel required>Item name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.itemName ? <FormHelperText>{errors.itemName.message}</FormHelperText> : null}
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
                    name="itemType"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.itemType)} fullWidth>
                        <InputLabel required>Category</InputLabel>
                        <Select {...field}>
                          <Option value="product">Product</Option>
                          <Option value="services">Service</Option>
                        </Select>
                        {errors.itemType ? <FormHelperText error>{errors.itemType.message}</FormHelperText> : null}
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
                    name="itemDescription"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.itemDescription)} fullWidth>
                        <InputLabel>Item description</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.itemDescription ? (
                          <FormHelperText>{errors.itemDescription.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 6,
                  }}
                >
                  <Controller
                    control={control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.costPrice)} fullWidth>
                        <InputLabel>Item Cost</InputLabel>
                        <OutlinedInput
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          type="number"
                        />
                        {errors.costPrice ? <FormHelperText error>{errors.costPrice.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 6,
                  }}
                >
                  <Controller
                    control={control}
                    name="sellingPrice"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.sellingPrice)} fullWidth>
                        <InputLabel required>Sales Price</InputLabel>
                        <OutlinedInput
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          type="number"
                        />
                        {errors.sellingPrice ? (
                          <FormHelperText error>{errors.sellingPrice.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3} divider={<Divider />}>
              <Typography variant="h6">Accounting Entries</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="expenseAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Expense')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.expenseAcct)} fullWidth>
                            <InputLabel>Expense Account (Expense)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.expenseAcct ? <FormHelperText>{errors.expenseAcct.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
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
                    name="inventoryAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Assets')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.inventoryAcct)} fullWidth>
                            <InputLabel>Inventory Account (Assets)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.inventoryAcct ? (
                              <FormHelperText>{errors.inventoryAcct.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
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
                    name="receivableAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Assets')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.receivableAcct)} fullWidth>
                            <InputLabel>Receivable Account (Assets)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.receivableAcct ? (
                              <FormHelperText>{errors.receivableAcct.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
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
                    name="incomeAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Revenue')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.incomeAcct)} fullWidth>
                            <InputLabel>Income Account (Revenue)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.incomeAcct ? <FormHelperText>{errors.incomeAcct.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
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
                    name="traddingAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Revenue')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.traddingAcct)} fullWidth>
                            <InputLabel>Trading Account (Revenue)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.traddingAcct ? (
                              <FormHelperText>{errors.traddingAcct.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
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
                    name="interestAcct"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={accounts ?? []}
                        onChange={(_, value)=> field.onChange(value)}
                        getOptionLabel={(account) => account.accountName}
                        filterOptions={(options, { inputValue }) =>
                          options.filter((ctx) => ctx.accountRootType === 'Revenue')
                        }
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.interestAcct)} fullWidth>
                            <InputLabel>Interest Account (Revenue)</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.interestAcct ? (
                              <FormHelperText>{errors.interestAcct.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, options) => (
                          <Option {...props} key={options.accountId} value={options.accountId}>
                            {options.accountName}
                          </Option>
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.items.list}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default ItemCreateForm;
