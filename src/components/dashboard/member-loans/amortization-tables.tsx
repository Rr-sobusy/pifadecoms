'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { X as Xicon } from '@phosphor-icons/react/dist/ssr/X';
import { stringify } from 'json-bigint';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { dayjs } from '@/lib/dayjs';
import type { AccounTreeType } from '@/actions/accounts/types';
import { ILoanType } from '@/actions/loans/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import CreateAmortizationPayment from './create-amortization-payment-dialog';

type Props = {
  rows: ILoanType[0]['Repayments'][0][];
  accounts: AccounTreeType;
  memberId: string | undefined;
  loanId: bigint | undefined;
};

function AmortizationTable({ rows, accounts, memberId, loanId }: Props) {
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
      formatter: ({ paymentSched, paymentDate }) => {
        const isPastDue = dayjs(paymentSched).isBefore(dayjs()) && !paymentDate;

        return (
          <Stack alignItems="center" spacing={1} direction="row">
            <Typography variant="subtitle2" sx={{ color: paymentDate ? 'text.secondary' : 'text.primary' }}>
              {dayjs(paymentSched).format('MMM DD YYYY')}
            </Typography>

            {paymentDate ? (
              <Chip label="Paid" color="success" variant="outlined" icon={<CheckCircleIcon />} size="small" />
            ) : isPastDue ? (
              <Chip label="Due" color="error" variant="outlined" icon={<Xicon />} size="small" />
            ) : null}
          </Stack>
        );
      },
    },

    {
      name: 'Date Paid',
      formatter: (row) => <div>{row.paymentDate && dayjs(row.paymentDate).format('MMM DD YYYY')}</div>,
    },
    {
      name: 'Payment O.R',
      formatter: (row) => <div>{row.JournalEntries?.referenceName.toString()}</div>,
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
          ? prevSelected.filter((r) => r.repaymentId !== row.repaymentId)
          : [...prevSelected, row];
      });
    } else {
      alert('Payment already settled');
    }
  }

  function handleDeselectOne(_: React.ChangeEvent, row: ILoanType[0]['Repayments'][0]) {
    setSelectedRows((prevSelected) => {
      const isAlreadySelected = prevSelected.some((r) => Number(r.repaymentId) === Number(row.repaymentId));
      if (isAlreadySelected) {
        return prevSelected.filter((r) => r.repaymentId !== row.repaymentId);
      }
      return prevSelected;
    });
  }

  function handleSelectAll(_: React.ChangeEvent) {
    setSelectedRows(rows.filter((row) => !row.paymentDate)); // Select all unpaid
  }

  function handleDeselectAll() {
    setSelectedRows([]);
  }

  const isSame = Object.is(stringify(rows), stringify(watchedRows));

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
        onDeselectOne={handleDeselectOne}
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
      <CreateAmortizationPayment
        loanId={loanId}
        memberId={memberId}
        accounts={accounts}
        selectedRows={selectedRows}
        handleClose={setDialogClose}
        open={isDialogOpen}
        handleRemoveSelectedRows={handleDeselectAll}
      />
    </>
  );
}

export default AmortizationTable;
