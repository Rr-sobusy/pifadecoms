'use server';

import { revalidatePath } from 'next/cache';
import { FundTransactionsType } from '@prisma/client';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberFundsSchema } from './types';

export const createFundTransaction = actionClient.schema(memberFundsSchema).action(async ({ parsedInput: Request }) => {
  const getSavingsUpdate = (transactionType: FundTransactionsType) => {
    if (transactionType === 'SavingsDeposit')
      return {
        increment: Request.postedBalance,
      };
    if (transactionType === 'SavingsWithdrawal')
      return {
        decrement: Request.postedBalance,
      };
    return undefined;
  };

  const getShareCapUpdate = (transactionType: FundTransactionsType) => {
    if (transactionType === 'ShareCapDeposit')
      return {
        increment: Request.postedBalance,
      };
    if (transactionType === 'ShareCapWithdrawal')
      return {
        decrement: Request.postedBalance,
      };
  };

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

  let serverResponse;

  try {
    const currentBalance = await prisma.memberFunds.findUniqueOrThrow({
      where: {
        fundId: Request.fundId,
      },
    });
    /**
     * * Batching of queries
     */
    const [queryResult] = await prisma.$transaction([
      /**
       * * First batch - create ledger postings and create memberFunds Transactions
       */
      prisma.journalEntries.create({
        data: {
          entryDate: Request.entryDate,
          journalType: Request.journalType,
          referenceName: Request.reference,
          referenceType: Request.referenceType,
          memberId: Request.particulars?.memberId,

          JournalItems: {
            create: Request.journalLineItems.map((lineItems) => ({
              accountId: lineItems.accountDetails.accountId,
              credit: lineItems.credit,
              debit: lineItems.debit,
            })),
          },

          MemberFundsTransact: {
            create: {
              fundId: Request.fundId,
              fundType: Request.fundType,
              postedBalance: Request.postedBalance,
              transactionType: Request.fundTransactionsType,
              createdAt: Request.entryDate,
              newBalance:
                Request.fundTransactionsType === 'SavingsDeposit' ||
                Request.fundTransactionsType === 'SavingsWithdrawal'
                  ? postNewBalance(Request.fundTransactionsType, Request.postedBalance, currentBalance.savingsBal)
                  : postNewBalance(Request.fundTransactionsType, Request.postedBalance, currentBalance.shareCapBal),
            },
          },
        },
      }),

      /**
       * * Second batch of queries. Update current savings or share capital based on given parameters and update the updateAt
       */
      prisma.memberFunds.update({
        where: {
          fundId: Request.fundId,
        },
        data: {
          savingsBal: getSavingsUpdate(Request.fundTransactionsType),
          shareCapBal: getShareCapUpdate(Request.fundTransactionsType),
          updatedAt: new Date(),
        },
      }),

      //* second batch of query
      ...Request.journalLineItems.map((lineItem) => {
        const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
        const amount = lineItem.debit - lineItem.credit;

        return prisma.accountsThirdLvl.update({
          where: {
            accountId: lineItem.accountDetails.accountId,
          },
          data: {
            runningBalance: {
              [isIncrement ? 'increment' : 'decrement']: amount,
            },
          },
        });
      }),
    ]);

    serverResponse = { success: true, message: queryResult };
  } catch (error) {
    if (error instanceof Error) {
      serverResponse = { success: false, message: `Error occured in server. Stack: ${error.stack}` };
    }
  }

  revalidatePath(paths.dashboard.funds.view(Request.fundId));
  return serverResponse;
});
