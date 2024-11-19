/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { invoiceSchema } from './types';

export const createInvoice = actionClient
  .schema(invoiceSchema)
  .bindArgsSchemas<[grandTotal: z.ZodNumber]>([z.number()])
  .action(async ({ parsedInput: Request, bindArgsParsedInputs: Args }) => {
    try {
      const newInvoice = await prisma.invoice.create({
        data: {
          dateOfInvoice: Request.invDate,
          baseGrandTotal: Args[0],
          outStandingAmt: Args[0],
          memberId: Request.member.memberId,
          InvoiceItems: {
            create: Request.lineItems.map((item) => ({ itemID: item.itemId, quantity: item.quantity,trade : item.trade ,rate: item.rate })),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    revalidatePath(paths.dashboard.invoice.list);
    redirect(paths.dashboard.invoice.list);
  });
