'use client';

import React from 'react';
import { FormControlLabel } from '@mui/material';
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
import type { JournalType } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import { transactionalSchema, type TransactionalSchemaType } from '@/actions/transactional/types';
import { DataTable } from '@/components/core/data-table';
import { Option } from '@/components/core/option';

type NewJournalFromProps = {
  data: AccounTreeType;
};

const newTypeSchema = z.object({
  entryDate: z.date(),
  reference: z.string().optional(),
  referenceType: z.enum(['cashReceipts', 'cashDisbursement', 'generalJournal']),
  notes: z.string().optional(),
  particulars: z.string().optional(),

  // entries
  journalLineItems: z
    .array(
      z.object({
        journalLineItemId: z.string(),
        accountDetails: z.object({
          accountId: z.string(),
          accountName: z.string(),
          createdAt: z.date().optional(),
          rootId: z.number().optional(),
          openingBalance: z.number().optional(),
          runningBalance: z.number().optional(),
          updatedAt: z.date().optional(),
          isActive: z.boolean().optional(),
          group: z.string(),
        }),
        debit: z.number(),
        credit: z.number(),
      })
    )
    .min(2, { message: 'Affected account must be two or more!' })
    .superRefine((items, ctx) => {
      const totalDebit = items.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = items.reduceRight((sum, item) => sum + item.credit, 0);

      if (totalDebit !== totalCredit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Total debits and total credits must be equal.',
        });
      }
    }),
});

const JournalMap: Record<string, JournalType> = {
  'Cash Receipts': 'cashReceipts',
  'Cash Disbursement': 'cashDisbursement',
  'General Journal': 'generalJournal',
};

function NewJournalFrom({ data }: NewJournalFromProps) {
  const { control, getValues, setValue, watch } = useForm<z.infer<typeof newTypeSchema>>({
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
    },
  });

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
        },
      },
    ]);
  }, [getValues, setValue]);

  const removeJournalLineItemHandler = React.useCallback(
    (lineItemId: string) => {
      const journalLines = getValues('journalLineItems');

      setValue(
        'journalLineItems',
        journalLines.filter((lineItems) => lineItems.journalLineItemId !== lineItemId)
      );
    },
    [setValue, getValues]
  );

  const totalDebits = lineItems.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = lineItems.reduce((sum, item) => sum + item.credit, 0);

  return (
    <form action="">
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
                  <DatePicker {...field} format="MMM D, YYYY" sx={{ width: '100%' }} label="Posting date *" />
                )}
              />
              <Controller
                name="referenceType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={Object.entries(JournalMap).map(([ctx]) => ctx)}
                    renderInput={(params) => <TextField {...params} label="Journal Entry type" />}
                    renderOption={(props, option) => (
                      <Option
                        {...props}
                        value={option}
                        key={option}
                        // Optional: Indent for "tree-like" appearance
                      >
                        <span style={{ marginLeft: 15 }}>{option}</span>
                      </Option>
                    )}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="reference"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel required>Reference #</InputLabel>
                    <OutlinedInput {...field} type="text" />
                  </FormControl>
                )}
              />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel required>Notes </InputLabel>
                    <OutlinedInput {...field} rows={3} multiline sx={{ minHeight: 80 }} type="text" />
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
                        options={flattenedLabels} // Group options by category
                        getOptionLabel={(option) => option.accountName} // Label to display
                        groupBy={(option) => option.group}
                        renderInput={(params) => <TextField {...params} label="Account name" />}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        renderOption={(props, option) => (
                          <Option
                            {...props}
                            value={option.accountId}
                            key={option.accountId}
                            // Optional: Indent for "tree-like" appearance
                          >
                            <span style={{ marginLeft: 15 }}>{option.accountName}</span>
                          </Option>
                        )}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`journalLineItems.${index}.debit`}
                    render={({ field }) => (
                      <FormControl sx={{ width: '10%' }}>
                        <InputLabel>Debit</InputLabel>
                        <OutlinedInput
                          {...field}
                          onChange={(event) => field.onChange(Number(event.target.value))}
                          defaultValue={0}
                          type="number"
                        />
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name={`journalLineItems.${index}.credit`}
                    render={({ field }) => (
                      <FormControl sx={{ width: '10%' }}>
                        <InputLabel>Credit</InputLabel>
                        <OutlinedInput
                          {...field}
                          onChange={(event) => field.onChange(Number(event.target.value))}
                          defaultValue={0}
                          type="number"
                        />
                      </FormControl>
                    )}
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
                  rex
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
            <Button onClick={() => console.log(getValues('journalLineItems'))}>Post Entry</Button>
            <Button variant="contained">Cancerl</Button>
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
}

export default NewJournalFrom;
