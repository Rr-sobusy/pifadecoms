'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import Decimal from 'decimal.js';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { paths } from '@/paths';
import { JournalMap } from '@/lib/api-utils/journal-map';
import useDebounce from '@/lib/api-utils/use-debounce';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import type { MembersType } from '@/actions/members/types';
import { createManualJournal } from '@/actions/transactional/create-manual-entry';
import { transactionalSchema, type TransactionalSchemaType } from '@/actions/transactional/types';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../../core/InputFields';

interface NewJournalFromProps {
  data: AccounTreeType;
}

function NewJournalFrom({ data }: NewJournalFromProps) {
  const {
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionalSchemaType>({
    defaultValues: {
      journalLineItems: [
        {
          journalLineItemId: uuidv4(),
          accountDetails: {
            accountId: '',
            accountName: '',
          },
          debit: 0,
          credit: 0,
        },
        {
          journalLineItemId: uuidv4(),
          accountDetails: {
            accountId: '',
            accountName: '',
          },
          debit: 0,
          credit: 0,
        },
      ],
      entryDate: new Date(),
      referenceType: 'ManualJournals',
    },
    resolver: zodResolver(transactionalSchema),
  });

  const [member, setMemberData] = React.useState<MembersType['members'][0][]>([]);

  const memberData = watch('particulars');

  const debouncedValue = useDebounce(memberData?.lastName ?? '', 300);

  React.useEffect(() => {
    if (!debouncedValue) {
      setMemberData([]);
      return;
    }

    async function fetchMemberDataOnDebounce() {
      try {
        const data: MembersType['members'] = await fetch('/dashboard/members/api', {
          method: 'POST',
          body: JSON.stringify({ memberName: debouncedValue }),
        }).then((res) => res.json());
        setMemberData(data);
      } catch (error) {
        logger.debug(error);
      }
    }
    fetchMemberDataOnDebounce();
  }, [debouncedValue]);

  const { execute, isExecuting, result } = useAction(createManualJournal);

  const lineItems = watch('journalLineItems');

  const flattenedLabels = data.flatMap((group) =>
    group.Children.map((option) => ({
      ...option,
      rootType: group.rootType,
      group: group.rootName,
    }))
  );

  const handleAddJournallineLineItem = React.useCallback(() => {
    const journalLines = getValues('journalLineItems');
    setValue('journalLineItems', [
      ...journalLines,
      {
        journalLineItemId: uuidv4(),
        debit: 0,
        credit: 0,
        accountDetails: {
          accountId: '',
          accountName: '',
          group: '',
          createdAt: new Date(),
          isActive: true,
          openingBalance: new Decimal(0),
          runningBalance: new Decimal(0),
          rootId: 1,
          rootType: 'Assets',
          updatedAt: new Date(),
        },
      },
    ]);
  }, [getValues, setValue]);

  const removeJournalLineItemHandler = React.useCallback(
    (lineItemId: string) => {
      const journalLines = getValues('journalLineItems');

      setValue(
        'journalLineItems',
        journalLines.filter((lineItem) => lineItem.journalLineItemId !== lineItemId)
      );
    },
    [setValue, getValues]
  );

  const totalDebits = lineItems.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = lineItems.reduce((sum, item) => sum + item.credit, 0);

  const submitHandler = (data: TransactionalSchemaType) => {
    try {
      execute(data);

      if (!result.serverError) {
        toast.success('New Entry Posted.');
      }
    } catch (error) {
      toast.error(`Error occured: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
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
              <FormControl fullWidth>
                <InputLabel>Journal Entry #</InputLabel>
                <OutlinedInput disabled type="text" defaultValue={'Journal No. - *'} />
              </FormControl>
              <Controller
                name="entryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    value={dayjs(field.value)}
                    slotProps={{
                      textField: {
                        error: Boolean(errors.entryDate),
                        fullWidth: true,
                        helperText: errors.entryDate?.message,
                      },
                    }}
                    format="MMM D, YYYY"
                    sx={{ width: '100%' }}
                    label="Posting date *"
                  />
                )}
              />
              <Controller
                name="journalType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={Object.entries(JournalMap).map(([ctx]) => ctx)}
                    renderInput={(params) => (
                      <FormControl error={Boolean(errors.journalType)} fullWidth>
                        <TextField error={Boolean(errors.journalType)} {...params} label="Journal Entry type *" />
                        {errors.journalType && <FormHelperText>{errors.journalType.message}</FormHelperText>}
                      </FormControl>
                    )}
                    renderOption={(props, option) => (
                      <Option {...props} value={option} key={option}>
                        <span style={{ marginLeft: 15 }}>{option}</span>
                      </Option>
                    )}
                    onChange={(_, value) => {
                      field.onChange(JournalMap[value ?? '']);
                    }}
                    fullWidth
                  />
                )}
              />
              <Controller
                control={control}
                name="particulars"
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    onInputChange={(_, value) => {
                      if (!value) {
                        return setValue('particulars.lastName', '');
                      }
                      setValue('particulars.lastName', value); // Update form value when input changes
                    }}
                    onChange={(_, value) => {
                      field.onChange(value); // Update form value on selection
                    }}
                    options={member}
                    getOptionLabel={(option) =>
                      option && `${option.lastName} ${option.firstName} ${option.middleName || ''}`
                    }
                    renderInput={(params) => (
                      <FormControl error={Boolean(errors.particulars?.message)} fullWidth>
                        <FormLabel>Member Name</FormLabel>
                        <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                      </FormControl>
                    )}
                    renderOption={(props, options) => (
                      <Option {...props} key={options.memberId} value={options.memberId}>
                        {`${options.lastName}, ${options.firstName} ${options.middleName || ''}`}
                      </Option>
                    )}
                  />
                )}
              />
              <Controller
                name="reference"
                control={control}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.reference)} fullWidth>
                    <InputLabel required>Reference #</InputLabel>
                    <OutlinedInput
                      {...field}
                      type="text"
                      onChange={(event) => {
                        const ref = event.target.value;
                        if (ref) return field.onChange(ref);
                        return null;
                      }}
                    />
                    {errors.reference && <FormHelperText>{errors.reference.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.notes)} fullWidth>
                    <InputLabel>Notes </InputLabel>
                    <OutlinedInput {...field} rows={3} multiline sx={{ minHeight: 80 }} type="text" />
                    {errors.notes && <FormHelperText>{errors.notes.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Box>
            <Divider />
            <Typography variant="body2">Journal Entry</Typography>
            <Stack spacing={2}>
              {lineItems.map((items, index) => (
                <Stack spacing={3} direction="row" key={index}>
                  <Controller
                    control={control}
                    name={`journalLineItems.${index}.accountDetails`}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        sx={{ width: '50%' }}
                        options={flattenedLabels}
                        getOptionLabel={(option) => option.accountName}
                        groupBy={(option) => option.group}
                        renderInput={(params) => <TextField {...params} label="Account name *" />}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        renderOption={(props, option) => (
                          <Option {...props} value={option.accountId} key={option.accountId}>
                            <span style={{ marginLeft: 15 }}>{option.accountName}</span>
                          </Option>
                        )}
                        fullWidth
                      />
                    )}
                  />
                  <FormInputFields
                    sx={{ width: '10%' }}
                    control={control}
                    name={`journalLineItems.${index}.debit`}
                    inputLabel="Debit (Php)"
                    variant="number"
                    isRequired
                  />
                  <FormInputFields
                    sx={{ width: '10%' }}
                    control={control}
                    name={`journalLineItems.${index}.credit`}
                    inputLabel="Credit (Php)"
                    variant="number"
                    isRequired
                  />
                  <IconButton
                    onClick={() => removeJournalLineItemHandler(items.journalLineItemId)}
                    disabled={index === 0 || index === 1}
                    color="error"
                    sx={{ alignSelf: 'flex-end' }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Stack>
              ))}
              <Stack spacing={4} flexDirection="row">
                <Stack sx={{ width: '50%' }} spacing={3}>
                  <Typography variant="subtitle2">Totals</Typography>
                </Stack>
                <Stack sx={{ width: '10%' }} spacing={3}>
                  <Typography variant="subtitle2">{formatToCurrency(totalDebits, 'Fil-ph', 'Php')}</Typography>
                </Stack>
                <Stack sx={{ width: '10%', marginLeft: '-7px' }} spacing={3}>
                  <Typography variant="subtitle2">{formatToCurrency(totalCredits, 'Fil-ph', 'Php')}</Typography>
                </Stack>
              </Stack>
              <div>
                <Typography marginBottom={1} color="error">
                  {errors.journalLineItems?.root?.message}
                  {errors.journalLineItems?.[0]?.root?.message}
                </Typography>
                <Button
                  onClick={handleAddJournallineLineItem}
                  color="secondary"
                  startIcon={<PlusCircleIcon />}
                  variant="outlined"
                >
                  Add line
                </Button>
              </div>
            </Stack>
          </Stack>
          <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
            <Button LinkComponent={Link} href={paths.dashboard.finance.journal} type="button">
              Cancel
            </Button>
            <Button disabled={isExecuting} type="submit" variant="contained">
              {isExecuting ? 'Posting Entry...' : 'Post Entry'}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
}

export default NewJournalFrom;
