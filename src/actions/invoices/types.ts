import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { transactionalSchema } from '../transactional/types';
import { fetchInvoiceItemPerMember, fetchInvoices, fetchSingleInvoice } from './fetch-invoice';

export type InvoiceType = Prisma.PromiseReturnType<typeof fetchInvoices>;
export type SingleInvoiceType = Prisma.PromiseReturnType<typeof fetchSingleInvoice>;
export type InvoiceItemsWithItem = Prisma.InvoiceGetPayload<{
  include: {
    InvoiceItems: {
      include: {
        Item: true;

        ItemPayment: true;
      };
    };
    Members: true;
  };
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
        quantity: z.number().min(1, { message: 'Quantity must be 1 or greater.' }),
        trade: z.number(),
        rate: z.number(),
      })
    )
    .min(1),
});

export const invoiceItemsPaymentschema = transactionalSchema
  .extend({
    paymentLine: z.array(
      z.object({
        invoiceItemId: z.number(),
        itemName: z.string(),
        quantityPurchased: z.number(),
        principal: z.number(),
        trade: z.number(),
        tradePaying:z.number(),
        principalPaying: z.number(),
        interestPaying: z.number(),
      })
    ),
  })
  .superRefine((items, ctx) => {
    if (!items.paymentLine || items.paymentLine.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Payment line is required!',
        path: ['paymentLine'],
      });
    }

    const totalJournalItems = (items.journalLineItems || []).reduce((acc, curr) => acc + curr.debit, 0);

    const totalPayments = items.paymentLine.reduce((acc, curr) => {
      const principal = Number(curr.principalPaying) || 0;
      const interest = Number(curr.interestPaying) || 0;
      const trade = Number(curr.tradePaying) || 0;
      return acc + (principal + interest + trade);
    }, 0);


    if (Math.abs(totalPayments - totalJournalItems) > 0.01) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Total payments are not equal to journal line items.',
        path: ['paymentLine'],
      });
    }
  });

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type InvoiceItemPerMemberTypes = Prisma.PromiseReturnType<typeof fetchInvoiceItemPerMember>;
export type InvoiceItemsPaymentType = z.infer<typeof invoiceItemsPaymentschema>;
