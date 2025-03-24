/**
 * * This component is used when a transaction is already posted to journals.
 * * Like in giving dividends. The some part of it must go to member's share capital
 */
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { type FundTransactionsType } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { createFundTransactionNoPosting } from '@/actions/funds/create-fund-transaction-no-posting';
import { memberFundsNoPosting, type MemberFundsNoPostingType } from '@/actions/funds/types';
import type { FundTransactions } from '@/actions/funds/types';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../member-loans/InputFields';

interface FundTransactionNonPostingProps {
  open: boolean;
  fundTransactions: FundTransactions;
  fundId: number;
  transactionType: FundTransactionsType;
}

function FundTransactionNonPosting({
  open = true,
  transactionType,
  fundTransactions,
  fundId,
}: FundTransactionNonPostingProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { execute, isExecuting, result } = useAction(createFundTransactionNoPosting);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MemberFundsNoPostingType>({
    resolver: zodResolver(memberFundsNoPosting),
    defaultValues: {
      fundId: Number(fundId),
      postingAmount: 0,
      journalRef: 0,
    },
  });

  function handleClose() {
    router.push(pathname, { scroll: false });
  }

  React.useEffect(() => {
    function reconcileValue() {
      setValue('fundTransactionType', transactionType);
      setValue(
        'fundType',
        ['SavingsDeposit', 'SavingsWithdrawal'].includes(transactionType) ? 'Savings' : 'ShareCapital'
      );
    }
    reconcileValue();
  }, [transactionType]);

  React.useEffect(() => {
    if (result?.data) {
      if (result.data?.success) {
        toast.success('Transaction posted successfully.');
        reset();
        handleClose();
      } else {
        toast.error('Transaction failed to post.');
      }
    }
  }, [result]);
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <form onSubmit={handleSubmit((data) => execute(data))}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
          >
            <Stack>
              <Typography variant="h6"> New Transaction</Typography>
              <Typography color="" variant="caption">
                Fund Transaction w/out journal posting.
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <FormControl disabled>
              <InputLabel>Transaction Type</InputLabel>
              <OutlinedInput
                defaultValue={
                  ['SavingsDeposit', 'ShareCapDeposit'].includes(transactionType) ? 'Deposit' : 'Withdrawal'
                }
              />
            </FormControl>
            <FormControl disabled>
              <InputLabel>Member Name</InputLabel>
              <OutlinedInput
                defaultValue={`${fundTransactions?.Member.lastName} ${fundTransactions?.Member.firstName}`}
              />
            </FormControl>
            <FormInputFields
              errors={errors.postingAmount}
              control={control}
              name="postingAmount"
              variant="number"
              isRequired
              inputLabel="Posting balance"
            />
            <FormInputFields
              errors={errors.journalRef}
              control={control}
              name="journalRef"
              variant="number"
              isRequired
              inputLabel="Journal Reference (No.)"
            />
          </Stack>
          <Stack justifyContent="flex-end" gap={2} flexDirection="row" marginTop={1}>
            <Button onClick={() => console.log(errors)} type="button" variant="outlined">
              Cancel
            </Button>
            <Button disabled={isExecuting} type="submit" variant="contained">
              {isExecuting ? 'Posting' : 'Post Transaction'}
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FundTransactionNonPosting;
