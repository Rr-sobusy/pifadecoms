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

  try {
    /**
     * * Batching of queries
     */
    const queryResult = await prisma.$transaction([
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

    return { success: true, message: queryResult };
  } catch (error) {
    return { success: false, errorMessage: error };
  } finally {
    revalidatePath(`${paths.dashboard.funds.view(Request.fundId)}`);
  }
});
