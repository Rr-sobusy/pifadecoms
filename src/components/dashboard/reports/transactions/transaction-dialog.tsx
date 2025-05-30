'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { JournalType } from '@prisma/client';

import { JournalMap } from '@/lib/api-utils/journal-map';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { deleteTransactionAction } from '@/actions/reports/account-transactions/delete-transaction';
import { AccountTransactionTypes, SingleAccountTransactionType } from '@/actions/reports/types';
import { ColumnDef, DataTable } from '@/components/core/data-table';
import { toast } from '@/components/core/toaster';

import { transactionTypeMap } from './account-transactions-table';

interface TransactionDialogProps {
  accountTransactions: SingleAccountTransactionType | undefined;
  isAdmin: boolean;
}

const getKeyByValue = (value: JournalType = 'cashReceipts') => {
  return Object.keys(JournalMap).find((key) => JournalMap[key] === value);
};

const columns = [
  {
    name: 'Account Name',
    formatter(row) {
      return <Typography variant="caption">{row.Accounts.accountName}</Typography>;
    },
  },
  {
    name: 'Debit (Php)',
    width: 'px',
    formatter(row) {
      return (
        <Typography variant="caption">
          {Number(row.debit) > 0 ? formatToCurrency(Number(row.debit), 'Fil-ph', 'Php') : '-'}
        </Typography>
      );
    },
  },
  {
    name: 'Credit (Php)',
    width: 'px',
    formatter(row) {
      return (
        <Typography variant="caption">
          {Number(row.credit) > 0 ? formatToCurrency(Number(row.credit), 'Fil-ph', 'Php') : '-'}
        </Typography>
      );
    },
  },
] satisfies ColumnDef<AccountTransactionTypes[0]['JournalItems'][0]>[] | undefined;

function TransactionDialog({ accountTransactions, isAdmin }: TransactionDialogProps) {
  const router = useRouter();
  const searchParamss = useSearchParams();

  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    if (searchParamss.get('entryId')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParamss]);

  function handleClose() {
    router.back();
  }

  const list = [
    {
      title: 'Journal Entry ID',
      value: accountTransactions?.entryId,
    },
    {
      title: 'Posting Date',
      value: dayjs(accountTransactions?.entryDate).format('MMM DD YYYY'),
    },
    {
      title: 'Posting Journal',
      value: getKeyByValue(accountTransactions?.journalType),
    },
    {
      title: 'Transaction Type',
      value: transactionTypeMap[accountTransactions?.referenceType || 'ManualJournals'],
    },
    {
      title: 'Reference No.',
      value: accountTransactions?.referenceName,
    },
    {
      title: 'Particular',
      value: accountTransactions?.Members
        ? accountTransactions?.Members?.lastName + ' ' + accountTransactions?.Members?.firstName
        : 'N/A',
    },
    {
      title: 'Notes',
      value: accountTransactions?.notes,
    },
  ];

  async function deleteHandler() {
    const result = await deleteTransactionAction({ transactionId: Number(accountTransactions?.entryId) });

    if (result?.data?.success) {
      handleClose();
      return toast.success('Account transaction deleted. Account balances reversed.');
    }

    return toast.error('Cannot delete transaction. Currently referenced by other modules.');
  }

  return (
    isOpen && (
      <Dialog
        maxWidth="sm"
        onClose={handleClose}
        open={isOpen}
        disableScrollLock
        keepMounted
        sx={{
          '& .MuiDialog-container': { justifyContent: 'flex-end' },
          '& .MuiDialog-paper': { height: '100%', width: '100%' },
          position: 'absolute',
          top: 10,
        }}
      >
        <DialogContent>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6">Account Transaction</Typography>
              <Typography color="" variant="caption">
                View selected posting entry
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack marginTop={3} spacing={1}>
            {list.map((ctx, index) => (
              <Typography key={index} variant="body2">{`${ctx.title}: ${ctx.value ? ctx.value : ''}`}</Typography>
            ))}
          </Stack>
          <Stack marginTop={4}>
            <Typography fontWeight={600} variant="subtitle2">
              Journal Items
            </Typography>

            <DataTable
              columns={columns}
              rows={(accountTransactions?.JournalItems as AccountTransactionTypes[0]['JournalItems'][0][]) || []}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ position: 'absolute', bottom: 85 }}>
            Note: You can only delete a transaction when not referenced by other modules.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: 4, marginRight: 3 }}>
          <Button disabled={!isAdmin} onClick={deleteHandler} variant="contained" color="error">
            Delete Entry
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default TransactionDialog;
