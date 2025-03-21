/**
 * * Create fund transcation without journal posting. It must reference to the
 * * exisiting ledger posting by specifying the journal entryId.
 * * This action will do posting in fundTransactions table only and updating the savings or shareCapital running balance.
 */

'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import type { FundTransactionsType } from '@prisma/client';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberFundsNoPosting } from './types';

const postNewBalance = (
  fundTransactionsType: FundTransactionsType,
  postedBalance: number,
  prevBalance: number
): number => {
  switch (fundTransactionsType) {
    case 'SavingsDeposit':
      return postedBalance + prevBalance;
    case 'SavingsWithdrawal':
      return prevBalance - postedBalance;
    case 'ShareCapDeposit':
      return prevBalance + postedBalance;
    case 'ShareCapWithdrawal':
      return prevBalance - postedBalance;
  }
};

const getSavingsUpdate = (transactionType: FundTransactionsType, postingBalance:number) => {
  if (transactionType === 'SavingsDeposit')
    return {
      increment: postingBalance
    };
  if (transactionType === 'SavingsWithdrawal')
    return {
      decrement: postingBalance
    };
  return undefined;
};

const getShareCapUpdate = (transactionType: FundTransactionsType, postingBalance:number) => {
  if (transactionType === 'ShareCapDeposit')
    return {
      increment: postingBalance,
    };
  if (transactionType === 'ShareCapWithdrawal')
    return {
      decrement: postingBalance,
    };
};


export const createFundTransactionNoPosting = actionClient
  .schema(memberFundsNoPosting)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;

    try {
      const memberFund = await prisma.memberFunds.findUnique({
        where: {
          fundId: Request.fundId,
        },
      });

      if (!memberFund) {
        throw new Error('Member fund not found');
      }

      const transaction = await prisma.$transaction(async (tx) => {
        const fundTransaction = await tx.fundTransactions.create({
          data: {
            fundId: Request.fundId,
            ledgerId: Request.journalRef,
            postedBalance: Request.postingAmount,
            transactionType: Request.fundTransactionType,
            fundType: Request.fundType,
            newBalance: ['SavingsWithrawal', 'SavingsDeposit'].includes(Request.fundTransactionType)
              ? postNewBalance(Request.fundTransactionType, Request.postingAmount, memberFund.savingsBal)
              : postNewBalance(Request.fundTransactionType, Request.postingAmount, memberFund.shareCapBal),
          },
        });

        await tx.memberFunds.update({
          where: {
            fundId: fundTransaction.fundId,
          },
          data: {
            savingsBal: getSavingsUpdate(fundTransaction.transactionType, Number(fundTransaction.postedBalance)),
            shareCapBal: getShareCapUpdate(fundTransaction.transactionType, Number(fundTransaction.postedBalance)),
          },
        });

        return fundTransaction;
      });

      serverResponse = { success: true, message: 'Transaction created successfully', data: transaction };
    } catch (error) {
      logger.debug(error);
      serverResponse = {
        success: true,
        message: error instanceof Prisma.PrismaClientKnownRequestError ? error.message : 'Error occured in server.',
      };
    }

    revalidatePath(paths.dashboard.funds.view(Request.fundId));
    return serverResponse;
  });
