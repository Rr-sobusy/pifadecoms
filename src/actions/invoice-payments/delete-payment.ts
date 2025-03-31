'use server';

import { z as zod } from 'zod';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const deletePaymentSchema = zod.array(zod.bigint());

export const deletePaymentAction = actionClient.schema(deletePaymentSchema).action(async ({ parsedInput }) => {
  let serverResponse;

  try {
    const invoicePayments = await prisma.invoiceItemsPayments.findMany({
      where: {
        itemsPaymentId: {
          in: parsedInput,
        },
      },
      include: {
        InvoiceItem: {
          select: {
            isTotallyPaid: true,
          },
        },
      },
    });

    if (!invoicePayments || invoicePayments.length < 1) {
      throw new Error('No payment id found.');
    }
    await prisma.$transaction(async (tx) => {
      await tx.invoiceItemsPayments.deleteMany({
        where: {
          itemsPaymentId: {
            in: parsedInput,
          },
        },
      });

      /**
       * * Update invoiceItem to not totally paid if it is paid
       */
      for (const invoiceId of invoicePayments) {
        const invoiceItem = await prisma.invoiceItems.findUnique({
          where: {
            invoiceItemId: invoiceId.invoiceItemId,
            isTotallyPaid: true,
          },
        });

        if (invoiceItem) {
          await tx.invoiceItems.update({
            where: {
              invoiceItemId: invoiceItem.invoiceItemId,
            },
            data: {
              isTotallyPaid: false,
            },
          });
        }
      }
    });
  } catch (error) {}
});
