/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { invoiceSchema } from './types';

export const createInvoice = actionClient
  .schema(invoiceSchema)
  .bindArgsSchemas<[grandTotal: z.ZodNumber]>([z.number()])
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;
    try {
      await prisma.invoice.create({
        data: {
          dateOfInvoice: Request.invDate,
          memberId: Request.member.memberId,
          InvoiceItems: {
            create: Request.lineItems.map((item) => ({
              itemID: item.itemId,
              quantity: item.quantity,
              trade: item.trade,
              principalPrice: item.rate,
            })),
          },
        },
      });

      serverResponse = { success: true, message: 'New invoice created.' };
    } catch (error) {
      serverResponse = {
        success: false,
        message: error instanceof Error ? `Error message: ${error.stack}` : 'Error occured in server.',
      };
    }
    revalidatePath(paths.dashboard.invoice.list);
    return serverResponse;
  });
