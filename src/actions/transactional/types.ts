/**
 * * Here, we must extend the schema for what use case. Example for invoice payments, we call the transactional
 * * posting schema then  manually extend the schema for it
 * *
 */

import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';

import { fetchJournals } from './fetch-journal';

export type JournalEntryType = Prisma.PromiseReturnType<typeof fetchJournals>;

export const transactionalSchema = z.object({
  entryDate: z.date(),
  reference: z.string(),
  journalType: z.enum(['cashReceipts', 'cashDisbursement', 'generalJournal']),
  notes: z.string().optional(),
  particulars: z
    .object({
      memberId: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      middleName:z.string().optional().nullable()
    })
    .optional(),
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
      z
        .object({
          journalLineItemId: z.string(),
          accountDetails: z.object({
            accountId: z.string().min(1).default(''),
            accountName: z.string().default(''),
            createdAt: z.date().optional().default(new Date()),
            rootId: z.number().optional().default(1),
            openingBalance: z.preprocess((val) => {
              if (typeof val === 'number' || typeof val === 'string') {
                try {
                  return new Decimal(val);
                } catch (error) {
                  return new Decimal(0);
                }
              }
              return new Decimal(0);
            }, z.instanceof(Decimal)),
            runningBalance: z.preprocess((val) => {
              if (typeof val === 'number' || typeof val === 'string') {
                try {
                  return new Decimal(val);
                } catch (error) {
                  return new Decimal(0);
                }
              }
              return new Decimal(0);
            }, z.instanceof(Decimal)),
            updatedAt: z.date().optional().default(new Date()),
            isActive: z.boolean().optional().default(false),
            group: z.string().default(''),
            rootType: z
              .enum(['Assets', 'Liability', 'Equity', 'Revenue', 'Expense', 'Contra_Assets'])
              .optional()
              .default('Assets'),
          }),
          debit: z.number(),
          credit: z.number(),
        })
        .superRefine((items, ctx) => {
          if (items.credit === 0 && items.debit === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Debit and Credit must not be both 0.',
            });
          }
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
