/**
 * * Here, we must extend the schema for what use case. Example for invoice payments, we call the transactional
 * * posting schema then  manually extend the schema for it
 * *
 */

import { JournalType, Prisma } from '@prisma/client';
import { z } from 'zod';

// utils for creating same schema of prisma models
import { createZodSchema } from '@/lib/zodSchema-helper';

import { fetchJournals } from './fetch-journal';

export type JournalEntryType = Prisma.PromiseReturnType<typeof fetchJournals>;

const rex = Object.entries(JournalType).map(([ctx]) => ctx);

export const transactionalSchema = z.object({
  entryDate: z.date(),
  reference: z.string().optional(),
  referenceType: z.enum(['cashReceipts', 'cashDisbursement', 'generalJournal']),
  notes: z.string().optional(),
  particulars: z.string().optional(),

  // entries
  journalLineItems: z
    .array(
      z.object({
        journalLineItemId: z.string(),
        accountDetails: z.object({
          accountId: z.string(),
          accountName: z.string(),
          RootID: z
            .object({
              rootType: z.string(),
            })
            .optional(),
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
