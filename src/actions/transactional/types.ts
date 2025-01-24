/**
 * * Here, we must extend the schema for what use case. Example for invoice payments, we call the transactional
 * * posting schema then  manually extend the schema for it
 * *
 */

import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchJournals } from './fetch-journal';

export type JournalEntryType = Prisma.PromiseReturnType<typeof fetchJournals>;

export const transactionalSchema = z.object({
  entryDate: z.date(),
  reference: z.string(),
  journalType: z.enum(['cashReceipts', 'cashDisbursement', 'generalJournal']),
  notes: z.string().optional(),
  particulars: z.object({
    memberId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
  referenceType: z.enum([
    'MemberRegistration',
    'SalesPayments',
    'LoanDisbursements',
    'LoanRepayments',
    'ManualJournals',
    'SavingsDeposit',
    'SavingsWithdrawal',
    'ShareDeposit',
    'ShareWithdrawal',
  ]),

  // entries
  journalLineItems: z
    .array(
      z.object({
        journalLineItemId: z.string(),
        accountDetails: z.object({
          accountId: z.string(),
          accountName: z.string(),
          createdAt: z.date().optional(),
          rootId: z.number().optional(),
          openingBalance: z.number().optional(),
          runningBalance: z.number().optional(),
          updatedAt: z.date().optional(),
          isActive: z.boolean().optional(),
          group: z.string(),
          rootType: z.enum(['Assets', 'Liability', 'Equity', 'Revenue', 'Expense']).optional(),
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

export type TransactionalSchemaType = z.infer<typeof transactionalSchema>;
