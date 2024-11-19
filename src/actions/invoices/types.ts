import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { fetchInvoices, fetchSingleInvoice } from './fetch-invoice';

export type InvoiceType = Prisma.PromiseReturnType<typeof fetchInvoices>;
export type SingleInvoiceType = Prisma.PromiseReturnType<typeof fetchSingleInvoice>;
export type InvoiceItemsWithItem = Prisma.InvoiceGetPayload<{
  include: {
    InvoiceItems: {
      include : {
        Item : true
      } 
    },
    Members : true
  },
}>;

export const invoiceSchema = z.object({
  member: z.object({
    memberId: z.string(),
    lastName: z.string(),
    firstName: z.string(),
  }),
  invNumber: z.string().nullable(),
  invDate: z.date(),
  lineItems: z
    .array(
      z.object({
        lineId: z.string(),
        itemId: z.string(),
        quantity: z.number().min(1, {message: "Quantity must be 1 or greater."}),
        trade:z.number(),
        rate: z.number(),
      })
    )
    .min(1),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
