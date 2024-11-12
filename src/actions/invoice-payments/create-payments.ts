'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { paymentSchema } from './types';

export const createPaymentPosting = actionClient.schema(paymentSchema).action(async ({ parsedInput: Request }) => {
  function addDebit(arr: number[]): number {
    let add: number = 0;
    arr.forEach((ctx) => (add += ctx));
    return add;
  }
  try {
    await prisma.$transaction([
      prisma.journalEntries.create({
        data: {
          entryDate: Request.entryDate,
          referenceName: Request.orNo,
          JournalItems: {
            create: Request.journalLineItems.map((lineItem) => ({
              accountId: lineItem.accountDetails.accountId,
              debit: lineItem.debit,
              credit: lineItem.credit,
            })),
          },
          InvoicePayments: {
            create: {
              orNo: Request.orNo,
              paymentReceived: Request.paymentReceived,
              paymentDate: Request.entryDate,
              invoiceId: Request.invoiceId,
            },
          },
        },
      }),

      // * second batch of query
      prisma.invoice.update({
        where: {
          invoiceId: Request.invoiceId,
        },
        data: {
          outStandingAmt: {
            decrement: Request.paymentReceived,
          },
        },
      }),

      // * third batch of query
      ...Request.journalLineItems.map((lineItem) => {
        const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.RootID?.rootType ?? '');
        const amount = isIncrement
          ? lineItem.debit - lineItem.credit // For Assets and Liabilities
          : lineItem.credit - lineItem.debit; // For Equity, Revenue, and Expense
    
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
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }

  revalidatePath(paths.dashboard.invoice.list);
  redirect(paths.dashboard.invoice.list);
});
