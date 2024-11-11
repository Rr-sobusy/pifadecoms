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
  journalLineItems: z.array(
    z.object({
      journalLineItemId: z.string(),
      accountDetails: z.object({
        accountId: z.string(),
        accountName: z.string(),
      }),
      debit: z.number(),
      credit: z.number(),
    })
  ),
});
