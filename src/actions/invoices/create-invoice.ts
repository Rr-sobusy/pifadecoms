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

export async function test() {
  return {
    data: 'rex',
  };
}

export const createInvoice = actionClient
  .schema(invoiceSchema)
  .bindArgsSchemas<[grandTotal: z.ZodNumber]>([z.number()])
  .action(async ({ parsedInput: Schema, bindArgsParsedInputs: Args }) => {
    try {
      const newInvoice = await prisma.invoice.create({
        data: {
          dateOfInvoice: Schema.invDate,
          baseGrandTotal: Args[0],
          outStandingAmt: Args[0],
          memberId: Schema.member.memberId,
          InvoiceItems: {
            create: Schema.lineItems.map((item) => ({ itemID: item.itemId, quantity: item.quantity, rate: item.rate })),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    revalidatePath(paths.dashboard.invoice.list);
    redirect(paths.dashboard.invoice.list);
  });
