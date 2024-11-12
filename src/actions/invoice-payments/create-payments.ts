'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { paymentSchema } from './types';

export const createPaymentPosting = actionClient.schema(paymentSchema).action(async ({ parsedInput: Request }) => {
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
    ]);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Known Prisma error (e.g., constraint violations, database errors)
      console.error('Prisma error code:', error.code);
      console.error('Error message:', error.message);
    } else {
      // Unknown error
      console.error('Unknown error:', error);
    }
  }
});
