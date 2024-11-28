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

  let serverResponse;

  try {
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
          memberId: Request.particulars,

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
            },
          },
        },
      }),

      /**
       * * Second batch of queries. Update current savings or share capital based on given parameters
       */
      prisma.memberFunds.update({
        where: {
          fundId: Request.fundId,
        },
        data: {
          savingsBal: getSavingsUpdate(Request.fundTransactionsType),
        },
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
