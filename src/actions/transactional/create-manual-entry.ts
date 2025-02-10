'use server';

/**
 * * For creating manual journal entries
 */
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { transactionalSchema } from './types';

export const createManualJournal = actionClient.schema(transactionalSchema).action(async ({ parsedInput: Request }) => {
  try {
    await prisma.$transaction([
      prisma.journalEntries.create({
        data: {
          entryDate: Request.entryDate,
          journalType: Request.journalType,
          referenceName: Request.reference,
          notes: Request.notes,
          referenceType: Request.referenceType,
          memberId: Request.particulars?.memberId,
          JournalItems: {
            create: Request.journalLineItems.map((lineItem) => ({
              accountId: lineItem.accountDetails.accountId,
              debit: lineItem.debit,
              credit: lineItem.credit,
            })),
          },
        },
      }),

      //* second batch of query
      // ...Request.journalLineItems.map((lineItem) => {
      //   const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
      //   const amount = isIncrement
      //     ? lineItem.debit - lineItem.credit // For Assets and Expense Acct
      //     : lineItem.credit - lineItem.debit; // For Equity, Revenue, and Liabilities acct

      //   return prisma.accountsThirdLvl.update({
      //     where: {
      //       accountId: lineItem.accountDetails.accountId,
      //     },
      //     data: {
      //       runningBalance: {
      //         [isIncrement ? 'increment' : 'decrement']: amount,
      //       },
      //     },
      //   });
      // }),
    ]);
  } catch (error) {
    return { success: false, errorMessage: error };
  } finally {
    revalidatePath(paths.dashboard.finance.journal);
    redirect(paths.dashboard.finance.journal);
  }
});
