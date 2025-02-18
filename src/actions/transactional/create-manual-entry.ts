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
  let serverResponse;
  try {
    const queryResult = await prisma.$transaction([
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

      /**
       * * Adjust account balances depends to their account "rootType".
       */
      ...Request.journalLineItems.map((lineItem) => {
        const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
        const amount = lineItem.debit - lineItem.credit; // For Equity, Revenue, and Liabilities acct

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
    serverResponse = {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Error occured in server',
    };
  }
  if (serverResponse.success) {
    revalidatePath(paths.dashboard.finance.journal);
    redirect(paths.dashboard.finance.journal);
  }
  return serverResponse;
});
