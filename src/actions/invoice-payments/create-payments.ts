'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { paymentSchema } from './types';

export const createPaymentPosting = actionClient.schema(paymentSchema).action(async ({ parsedInput: Request }) => {
  try {
    await prisma.$transaction([
      prisma.journalEntries.create({
        data: {
          entryDate: Request.entryDate,
          journalType: Request.journalType,
          referenceName: Request.reference,
          memberId: Request.particulars,
          referenceType: 'SalesPayments',
          JournalItems: {
            create: Request.journalLineItems.map((lineItem) => ({
              accountId: lineItem.accountDetails.accountId,
              debit: lineItem.debit,
              credit: lineItem.credit,
            })),
          },
          InvoicePayments: {
            create: {
              orNo: Request.reference,
              paymentReceived: Request.paymentReceived,
              paymentDate: Request.entryDate,
              invoiceId: Request.invoiceId,
            },
          },
        },
      }),

      // * second batch of query - update the outstanding amount in invoices.
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

      /**
       * * Third batch of query. Adjust account balances depends to their account "rootType".
       * * Increase balance of assets and expense account on debit and decrease in credit.
       * * Increase balance of income, equity and liability on credit and decrease in debit.
       */
      ...Request.journalLineItems.map((lineItem) => {
        const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
        const amount = isIncrement
          ? lineItem.debit - lineItem.credit // For Assets and Expense Acct
          : lineItem.credit - lineItem.debit; // For Equity, Revenue, and Liabilities acct

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
    return { success: false, errorMessage: error };
  } finally {
    revalidatePath(paths.dashboard.invoice.list);
    revalidatePath(paths.dashboard.invoice.payments);
    redirect(paths.dashboard.invoice.payments);
  }
});
