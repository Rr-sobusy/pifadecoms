'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const actionSchema = z.number();

export const deleteFundTransaction = actionClient.schema(actionSchema).action(async ({ parsedInput }) => {
  let serverResponse;

  try {
    const transaction = await prisma.fundTransactions.findFirst({
      where: {
        fundTransactId: parsedInput,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const rex = await prisma.$transaction([
      // Reverse updates to memberFunds balance
      prisma.memberFunds.update({
        where: { fundId: transaction.fundId },
        data: {
          savingsBal:
            transaction.transactionType === 'SavingsDeposit'
              ? { decrement: Number(transaction.postedBalance) }
              : transaction.transactionType === 'SavingsWithdrawal'
                ? { increment: Number(transaction.postedBalance) }
                : undefined,

          shareCapBal:
            transaction.transactionType === 'ShareCapDeposit'
              ? { decrement: Number(transaction.postedBalance) }
              : transaction.transactionType === 'ShareCapWithdrawal'
                ? { increment: Number(transaction.postedBalance) }
                : undefined,
        },
      }),

      // Delete MemberFundsTransact record
      prisma.fundTransactions.delete({
        where: {
          fundTransactId: transaction.fundTransactId,
        },
      }),
    ]);

    serverResponse = { success: true, message: 'Transaction successfully reversed.', fundId: rex[1].fundId };
  } catch (error) {
    if (error instanceof Error) {
      logger.debug(error);
      serverResponse = { success: false, message: `Error occurred in server. Stack: ${error.stack}` };
    }
  }
  revalidatePath(paths.dashboard.funds.view(serverResponse?.fundId || 0));
  return serverResponse;
});
