/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { paths } from '@/paths';
import { asyncHandler } from '@/lib/api-utils/asyncHandler';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { invoiceSchema } from './types';

export const createInvoice = actionClient
  .schema(invoiceSchema)
  .bindArgsSchemas<[grandTotal: z.ZodNumber]>([z.number()])
  .action(
    asyncHandler(async ({ parsedInput: Schema, bindArgsParsedInputs: Args }) => {
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

      revalidatePath(paths.dashboard.invoice.list);
      return {
        success: true,
        invoice: newInvoice,
      };
    })
  );
