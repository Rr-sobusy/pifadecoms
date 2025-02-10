'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { stringify } from 'json-bigint';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { ILoanType } from '@/actions/loans/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import CreateAmortizationPayment from './create-amortization-payment-dialog';
import type { AccounTreeType } from '@/actions/accounts/types';
type Props = {
  rows: ILoanType[0]['Repayments'][0][];
  accounts: AccounTreeType
  memberId:string | undefined
};

function AmortizationTable({ rows , accounts, memberId}: Props) {
  const { control, getValues } = useForm<{ rows: ILoanType[0]['Repayments'][0][] }>({ defaultValues: { rows: rows } });
  const [isDialogOpen, setDialogStatus] = useState<boolean>(false);
  const watchedRows = useWatch({ control, name: 'rows' });
  const [initialData, setInitialData] = useState<ILoanType[0]['Repayments'][0][]>(rows);
  const [modifiedRows, setModifiedRows] = useState<Set<bigint>>(new Set());
  // Detect changes and store only modified rows
  useEffect(() => {
    const changes = new Set<bigint>();
    watchedRows.forEach((row, index) => {
      if (
        row.paymentDate?.toISOString() !== rows[index].paymentDate?.toISOString() ||
        row.principal !== rows[index].principal ||
        row.interest !== rows[index].interest ||
        row.remarks !== rows[index].remarks
      ) {
        changes.add(row.repaymentId);
      }
    });
    setModifiedRows(changes);
  }, [watchedRows, rows]);

  const columns: ColumnDef<ILoanType[0]['Repayments'][0]>[] = [
    {
      name: 'Payment Schedule',
      formatter: (row) => (
        <Stack alignItems="center" spacing={1} direction="row">
          <Typography sx={{ color: !row.paymentDate ? 'text.primary' : 'text.secondary' }} variant="subtitle2">
            {dayjs(row.paymentSched).format('MMM DD YYYY')}
          </Typography>
          {row.paymentDate && (
            <Chip label="Paid" color="success" variant="outlined" icon={<CheckCircleIcon />} size="small" />
          )}
        </Stack>
      ),
    },
    {
      name: 'Date Paid',
      formatter: (row) => <div>{row.paymentDate && dayjs(row.paymentDate).format('MMM DD YYYY')}</div>,
    },
    {
      name: 'Payment O.R',
      formatter: (row) => <div>{ row.JournalEntries?.referenceName.toString()}</div>,
    },
    {
      name: 'Principal Amount',
      formatter: (row, index) => (
        <Controller
          control={control}
          name={`rows.${index}.principal`}
          render={({ field }) => <TextField disabled={row.paymentDate === null} {...field} type="number" />}
        />
      ),
    },
    {
      name: 'Interest',
      formatter: (row, index) => (
        <Controller
          control={control}
          name={`rows.${index}.interest`}
          render={({ field }) => <TextField disabled={row.paymentDate === null} {...field} type="number" />}
        />
      ),
    },
  ];
  const [selectedRows, setSelectedRows] = React.useState<ILoanType[0]['Repayments'][0][]>([]);

  function handleSelectOne(_: React.ChangeEvent, row: ILoanType[0]['Repayments'][0]) {
    if (!row.paymentDate) {
      setSelectedRows((prevSelected) => {
        const isAlreadySelected = prevSelected.some((r) => Number(r.repaymentId) === Number(row.repaymentId));

        return isAlreadySelected
          ? prevSelected.filter((r) => r.repaymentId !== row.repaymentId) // Remove if already selected
          : [...prevSelected, row]; // Add if not selected
      });
    }
  }

  function handleSelectAll(_: React.ChangeEvent) {
    setSelectedRows(rows.filter((row) => !row.paymentDate)); // Select all unpaid
  }

  function handleDeselectAll(_: React.ChangeEvent) {
    setSelectedRows([]);
  }

  const isSame = Object.is(stringify(rows), stringify(watchedRows));

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  function setDialogOpen(): void {
    setDialogStatus(true);
  }

  const setDialogClose = React.useCallback(() => {
    return setDialogStatus(false);
  }, [isDialogOpen]);
  return (
    <>
      <DataTable
        selected={new Set(selectedRows.map((r) => Number(r.repaymentId)))}
        onSelectOne={handleSelectOne}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        selectable
        uniqueRowId={(row) => Number(row.repaymentId)}
        columns={columns}
        rows={getValues('rows')}
      />
      <div>
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button
            disabled={isSame}
            variant="contained"
            onClick={() => {
              const updatedRepayments = watchedRows.filter((row) => modifiedRows.has(row.repaymentId));

              if (updatedRepayments.length > 0) {
                console.log('Saving only modified repayments:', updatedRepayments);
                // API call to save repayments...

                setInitialData(getValues('rows')); // ✅ Reset tracking with an array
                setModifiedRows(new Set()); // ✅ Reset modified rows
              }
            }}
          >
            Click
          </Button>
          <Button
            startIcon={<CreditCard />}
            onClick={setDialogOpen}
            disabled={selectedRows.length === 0}
            variant="contained"
          >
            Create Payment
          </Button>
        </Stack>
      </div>
      <CreateAmortizationPayment memberId={memberId} accounts={accounts} selectedRows={selectedRows} handleClose={setDialogClose} open={isDialogOpen} />
    </>
  );
}

export default AmortizationTable;
