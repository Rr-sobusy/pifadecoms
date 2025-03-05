'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { invoiceItemsPaymentschema } from '../invoices/types';

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
            memberId: Request.particulars?.memberId ?? '',

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

        //* Update is totallyPaid if reached equal or greater than principalAMount
        for (const payment of Request.paymentLine) {
          const invoiceItem = await tx.invoiceItems.findUnique({
            where: { invoiceItemId: payment.invoiceItemId },
            select: { trade: true, quantity: true, isTotallyPaid: true, principalPrice: true },
          });

          if (invoiceItem) {
            const totalAmount = invoiceItem.quantity * (invoiceItem.trade + invoiceItem.principalPrice);

            const totalPaid = await tx.invoiceItemsPayments.aggregate({
              where: { invoiceItemId: payment.invoiceItemId },
              _sum: { principalPaid: true, interestPaid: true },
            });

            const totalPaymentMade = Number(totalPaid._sum.principalPaid);

            if (totalPaymentMade >= totalAmount) {
              await tx.invoiceItems.update({
                where: { invoiceItemId: payment.invoiceItemId },
                data: { isTotallyPaid: true },
              });
            }
          }
        }
        return queryResult;
      });
      serverResponse = { success: true, message: newJournalEntry };
    } catch (error) {
      logger.debug(error);
    }

    revalidatePath(paths.dashboard.invoices.list);
    return serverResponse;
  });
