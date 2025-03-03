'use server';

import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { invoiceItemsPaymentschema } from '../invoices/types';
import { revalidatePath } from 'next/cache';
import { paths } from '@/paths';

export const invoiceItemPaymentAction = actionClient
  .schema(invoiceItemsPaymentschema)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;
    try {
      const newJournalEntry = await prisma.$transaction(async (tx) => {
        /**
         * * Create journal entry
         */
        const queryResult = await tx.journalEntries.create({
          data: {
            entryDate: Request.entryDate,
            journalType: Request.journalType,
            referenceName: Request.reference,
            referenceType: Request.referenceType,
            memberId : Request.particulars?.memberId ?? "",

            JournalItems: {
              create: Request.journalLineItems.map((journalLines) => ({
                accountId: journalLines.accountDetails.accountId,
                debit: journalLines.debit,
                credit: journalLines.credit,
              })),
            },

            InvoiceItemPayments: {
              create: Request.paymentLine.map((paymentLine) => ({
                interestPaid: paymentLine.interestPaying,
                principalPaid: paymentLine.principalPaying,
                invoiceItemId: paymentLine.invoiceItemId,
              })),
            },
          },
        });

        /**
         * * Create invoice items payments
         */
        // await Promise.all(
        //     Request.paymentLine.map((payments) =>
        //         tx.invoiceItemsPayments.createMany({
        //             data : {
        //                 invoiceItemId : payments.invoiceItemId,
        //                 principalPaid : payments.principalPaying,
        //                 interestPaid : payments.interestPaying,

        //             }
        //         })
        //     )
        //   );

        return queryResult;
      });
      serverResponse = { success: true, message: newJournalEntry };
    } catch (error) {
      logger.debug(error);
    }

    revalidatePath(paths.dashboard.invoices.list)
  });
