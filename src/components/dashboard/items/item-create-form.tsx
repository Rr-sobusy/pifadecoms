'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import type { AccountType } from '@/actions/accounts/types';
import { createNewItems } from '@/actions/items/create-new-item';
// schema and types
import { itemSchema, ItemSourcesType, ItemsSchemaType } from '@/actions/items/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../member-loans/InputFields';

interface ItemCreateFormProps {
  accounts?: { accountId: string; accountName: string; accountRootType: AccountType[0]['RootID']['rootType'] }[];
  itemSources: ItemSourcesType;
}

function ItemCreateForm({ itemSources = [] }: ItemCreateFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemsSchemaType>({ resolver: zodResolver(itemSchema), defaultValues: {} });

  const router = useRouter();

  const { execute, result } = useAction(createNewItems);

  React.useEffect(() => {
    if (result.data) {
      toast.success('New Item Created.');
      router.push(paths.dashboard.items.list);
    }
  }, [result]);

  const onSubmit = (ItemSchema: ItemsSchemaType) => {
    execute(ItemSchema);
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
                    md: 3,
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
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="sourceId"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.itemType)} fullWidth>
                        <InputLabel required>Item Source</InputLabel>
                        <Select {...field}>
                          {itemSources.map((source) => (
                            <Option key={source.sourceId} value={source.sourceId}>
                              {source.sourceName}
                            </Option>
                          ))}
                        </Select>
                        {errors.itemType ? <FormHelperText error>{errors.itemType.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="itemDescription"
                    variant="text"
                    inputLabel="Item description"
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 6,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="principalPrice"
                    variant="number"
                    inputLabel="Principal price"
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 6,
                  }}
                >
                  <FormInputFields
                    sx={{ width: '100%' }}
                    control={control}
                    name="trade"
                    variant="number"
                    inputLabel="Trade"
                  />
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 6,
                  }}
                ></Grid>
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
