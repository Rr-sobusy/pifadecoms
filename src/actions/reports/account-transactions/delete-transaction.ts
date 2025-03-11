'use server';

import { Prisma } from '@prisma/client';
import { z as zod } from 'zod';

import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { paths } from '@/paths';

const transactionSchema = zod.object({
  transactionId: zod.number().optional(),
});

export const deleteTransactionAction = actionClient.schema(transactionSchema).action(async ({ parsedInput }) => {
  if (parsedInput.transactionId === undefined) return;
  let serverResponse;
  try {
    await prisma.$transaction(async (tx) => {
      const result = await tx.journalEntries.delete({
        where: {
          entryId: parsedInput.transactionId,
        },
        include: {
          JournalItems: {
            include: {
              Accounts: {
                include: {
                  RootID: true,
                },
              },
            },
          },
        },
      });

      const journalItems = result.JournalItems;

      /**
       * * Revert account balances when a transaction is deleted.
       */
      const balanceUpdates = journalItems.map((lineItem) => {
        const isDecrement = ['Assets', 'Expense'].includes(lineItem.Accounts.RootID.rootType ?? '');
        const amount = Number(lineItem.debit) - Number(lineItem.credit);

        return tx.accountsThirdLvl.update({
          where: { accountId: lineItem.accountId },
          data: {
            runningBalance: {
              [isDecrement ? 'decrement' : 'increment']: amount,
            },
          },
        });
      });

      await Promise.all(balanceUpdates);
    });

    serverResponse = { success: true, message: 'Posted Transaction removed and balanced diverted!' };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: false,
      message: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : 'Error occured in server.',
    };
  }
  revalidatePath(paths.dashboard.reports.accountTransaction)
  return serverResponse;
});
