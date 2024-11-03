import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchInvoices } from './fetch-invoice';
import { memberSchema } from '../members/types';

export type InvoiceType = Prisma.PromiseReturnType<typeof fetchInvoices>;

export const invoiceSchema = z.object({
  member: z.object({
    memberId: z.string(),
    lastName: z.string(),
    firstName: z.string()
  }),
  invNumber: z.string().nullable(),
  invDate: z.date(),
  lineItems: z.array(
    z.object({
      lineId: z.string(),
      itemId: z.string(),
      quantity: z.number(),
      rate: z.number(),
    })
  ).min(1),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
