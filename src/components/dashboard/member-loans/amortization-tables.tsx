'use client';

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
      width: '50px',
    },
    {
      name: 'Payment Schedule',
      formatter: (row) => {
        const { paymentSched } = row;
        return <Typography variant="subtitle2">{dayjs(paymentSched).format('MMM DD YYYY')}</Typography>;
      },
    },

    {
      name: 'Date Paid',
      formatter: (row) => (
        <Typography variant="subtitle2">{row.paymentDate && dayjs(row.paymentDate).format('MMM DD YYYY')}</Typography>
      ),
    },
    {
      name: 'Payment O.R',
      formatter: (row) => <Typography variant="subtitle2">{row.JournalEntries?.referenceName.toString()}</Typography>,
    },
    {
      name: 'Principal Amount',
      formatter: (row) => (
        <Typography variant="subtitle2">{formatToCurrency(Number(row.principal), 'Fil-ph', 'Php')}</Typography>
      ),
    },
    {
      name: 'Interest',
      formatter: (row) => (
        <Typography variant="subtitle2">{formatToCurrency(Number(row.interest), 'Fil-ph', 'Php')}</Typography>
      ),
    },
    {
      name: 'Total Amount',
      formatter: (row) => (
        <Typography variant="subtitle2">
          {formatToCurrency(Number(row.interest) + Number(row.principal), 'Fil-ph', 'Php')}
        </Typography>
      ),
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
      <DataTable hover uniqueRowId={(row) => Number(row.repaymentId)} columns={columns} rows={rows} />
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
