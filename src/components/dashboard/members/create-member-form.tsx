'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { createNewMember } from '@/actions/members/create-member';
import { memberSchema, type MemberSchema } from '@/actions/members/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

export function CreateMemberForm(): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberSchema>({ resolver: zodResolver(memberSchema) });

  const { execute, isExecuting, result } = useAction(createNewMember);

  React.useEffect(() => {
    if (result.data?.success) {
      toast.success('Member created.');
      router.push(paths.dashboard.members.list);
    }
  }, [result.data]);

  const onSubmit = (val: MemberSchema) => {
    try {
      //    execute the action by invoking this !!
      execute(val);
    } catch (err) {
      logger.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Account information</Typography>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        border: '1px dashed var(--mui-palette-divider)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        p: '4px',
                      }}
                    ></Box>
                  </Stack>
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.lastName)} fullWidth>
                        <InputLabel required>Last Name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
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
                    name="firstName"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.firstName)} fullWidth>
                        <InputLabel required>First Name</InputLabel>
                        <OutlinedInput {...field} type="text" />
                        {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
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
                    name="contactNo"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.contactNo)} fullWidth>
                        <InputLabel required>Phone number</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.contactNo ? <FormHelperText>{errors.contactNo.message}</FormHelperText> : null}
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
                    name="birthDate"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.birthDate)} fullWidth>
                        <DatePicker
                          {...field}
                          format="MMM D, YYYY"
                          label="Birth Date *"
                          onChange={(date) => {
                            field.onChange(date?.toDate());
                          }}
                          slotProps={{
                            textField: {
                              error: Boolean(errors.birthDate),
                              fullWidth: true,
                              helperText: errors.birthDate?.message,
                            },
                          }}
                          value={dayjs(field.value)}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.gender)} fullWidth>
                        <InputLabel required>Gender</InputLabel>
                        <Select {...field}>
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                        </Select>
                        {errors.gender ? <FormHelperText>{errors.gender.message}</FormHelperText> : null}
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
                    name="address"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.address)} fullWidth>
                        <InputLabel required>Address</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.address ? <FormHelperText>{errors.address.message}</FormHelperText> : null}
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
                    name="occupation"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.occupation)} fullWidth>
                        <InputLabel>Occupation</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.occupation ? <FormHelperText>{errors.occupation.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            {/* <Stack spacing={3}>
              <Typography variant="h6">Billing information</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="billingAddress.country"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, value) => {
                          if (value) {
                            field.onChange(value.value);
                          }
                        }}
                        options={countryOptions}
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.billingAddress?.country)} fullWidth>
                            <InputLabel required>Country</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.billingAddress?.country ? (
                              <FormHelperText>{errors.billingAddress?.country?.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, option) => (
                          <Option {...props} key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        )}
                        value={countryOptions.find((option) => option.value === field.value)}
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
                    name="billingAddress.state"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.state)} fullWidth>
                        <InputLabel required>State</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.state ? (
                          <FormHelperText>{errors.billingAddress?.state?.message}</FormHelperText>
                        ) : null}
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
                    name="billingAddress.city"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.city)} fullWidth>
                        <InputLabel required>City</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.city ? (
                          <FormHelperText>{errors.billingAddress?.city?.message}</FormHelperText>
                        ) : null}
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
                    name="billingAddress.zipCode"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.zipCode)} fullWidth>
                        <InputLabel required>Zip code</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.zipCode ? (
                          <FormHelperText>{errors.billingAddress?.zipCode?.message}</FormHelperText>
                        ) : null}
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
                    name="billingAddress.line1"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.line1)} fullWidth>
                        <InputLabel required>Address</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.line1 ? (
                          <FormHelperText>{errors.billingAddress?.line1?.message}</FormHelperText>
                        ) : null}
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
                    name="taxId"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.taxId)} fullWidth>
                        <InputLabel>Tax ID</InputLabel>
                        <OutlinedInput {...field} placeholder="e.g EU372054390" />
                        {errors.taxId ? <FormHelperText>{errors.taxId.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack> */}
            {/* <Stack spacing={3}>
              <Typography variant="h6">Previous owed amount</Typography>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Same as billing address" />
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Additional information</Typography>
            </Stack> */}
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.customers.list}>
            Cancel
          </Button>
          <Button disabled={isExecuting} type="submit" variant="contained">
            Create member
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
