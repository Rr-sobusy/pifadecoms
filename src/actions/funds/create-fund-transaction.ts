'use server';

import { FundTransactionsType } from '@prisma/client';

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
    await prisma.$transaction([
      /**
       * * First batch - create ledger postings and create memberFunds Transactions
       */
      prisma.journalEntries.create({
        data: {
          entryDate: Request.entryDate,
          journalType: Request.journalType,
          referenceName: Request.reference,
          referenceType: Request.referenceType,

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
       * * Second batch of queries. Update current savings or share capital based in given parameters
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
  } catch (error) {}
});
