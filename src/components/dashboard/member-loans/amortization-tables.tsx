'use client';

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard } from '@phosphor-icons/react/dist/ssr/CreditCard';

// import { toast } from '@/components/core/toaster';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { AccounTreeType } from '@/actions/accounts/types';
import { ILoanType } from '@/actions/loans/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

import CreateAmortizationPayment from './create-amortization-payment-dialog';

interface Props {
  rows: ILoanType[0]['Repayments'][0][];
  accounts: AccounTreeType;
  memberId: string | undefined;
  loanId: bigint | undefined;
}

function AmortizationTable({ rows, accounts, memberId, loanId }: Props) {
  const [isDialogOpen, setDialogStatus] = useState<boolean>(false);

  const columns: ColumnDef<ILoanType[0]['Repayments'][0]>[] = [
    {
      name: '#',
      formatter: (_, index) => <div>{(index + 1).toString()}</div>,
      width: '80px',
    },
    {
      name: 'Payment Schedule',
      formatter: (row) => {
        const { paymentSched, paymentDate } = row;
        return (
          <Stack alignItems="center" spacing={1} direction="row">
            <Typography variant="subtitle2" sx={{ color: paymentDate ? 'text.secondary' : 'text.primary' }}>
              {dayjs(paymentSched).format('MMM DD YYYY')}
            </Typography>

            <Chip label="Paid" color="success" variant="outlined" icon={<CheckCircleIcon />} size="small" />
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
      formatter: (row) => formatToCurrency(Number(row.principal), 'Fil-ph', 'Php'),
    },
    {
      name: 'Interest',
      formatter: (row) => formatToCurrency(Number(row.interest), 'Fil-ph', 'Php'),
    },
  ];

  function setDialogOpen(): void {
    setDialogStatus(true);
  }

  const setDialogClose = React.useCallback(() => {
    return setDialogStatus(false);
  }, [isDialogOpen]);

  return (
    <>
      <DataTable uniqueRowId={(row) => Number(row.repaymentId)} columns={columns} rows={rows} />
      <div>
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button startIcon={<CreditCard />} onClick={setDialogOpen} variant="contained">
            Post Payment
          </Button>
        </Stack>
      </div>
      <CreateAmortizationPayment
        loanId={loanId}
        memberId={memberId}
        accounts={accounts}
        handleClose={setDialogClose}
        open={isDialogOpen}
      />
    </>
  );
}

export default AmortizationTable;
