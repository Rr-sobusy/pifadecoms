/**
 * * Here, we must extend the schema for what use case. Example for invoice payments, we call the Journal Posting schema then
 * * manually extend the schema for it
 */

import { z } from 'zod';

export const transactionalSchema = z.object({
  entryDate: z.date(),
  reference: z.string().optional(),
  referenceType: z.string().optional(),
  particulars: z.string().optional(),

  // entries
  journalLineItems: z
    .array(
      z.object({
        journalLineItemId: z.string(),
        accountDetails: z.object({
          accountId: z.string(),
          accountName: z.string(),
          RootID : z.object({
            rootType: z.string()
          }).optional()
        }),
        debit: z.number(),
        credit: z.number(),
      })
    )
    .min(2, { message: 'Affected account must be two or more!' })
    .superRefine((items, ctx) => {
      const totalDebit = items.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = items.reduceRight((sum, item) => sum + item.credit, 0);

      if (totalDebit !== totalCredit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Total debits and total credits must be equal.',
        });
      }
    }),
});
