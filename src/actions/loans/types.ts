import { Prisma } from '@prisma/client';
import { z as zod } from 'zod';

import { transactionalSchema } from '../transactional/types';
import { fetchLoanSources } from './fetch-loan-source';
import { fetchLoanDetails, fetchLoans } from './fetch-loans';

export const addLoanSchema = zod.object({
  repStyle: zod.enum(['StraightPayment', 'Diminishing', 'OneTime']),
  repInterval: zod.enum(['Weekly', 'Monthly', 'Yearly']),
  member: zod
    .object({
      memberId: zod.string(),
    })
    .optional(),
  amountLoaned: zod.number(),
  amountPayable: zod.number(),
  interest: zod.number(),
  paymentQty: zod.number(),
  issueDate: zod.date(),
  dueDate:zod.date(),
  party: zod
    .object({
      memberId: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
    })
    .optional(),
  loanId: zod.number().optional(),
  loanSource: zod.number(),
  isExisting: zod.boolean().default(false),
  ledgerId: zod.bigint().optional(),
  paymentSched: zod
    .array(
      zod.object({
        repaymentId: zod.number().optional(),
        paymentSched: zod.date(),
        principal: zod.number(),
        interest: zod.number(),
        datePaid: zod.date().optional(),
        amountPaid: zod.number().optional(),
        balance: zod.number().optional(),
        isExisting: zod.boolean().default(false),
      })
    )
    .min(1, { message: 'Amortization sched must not be null!' }),
});

export const loanSchemaExtended = transactionalSchema.merge(addLoanSchema);
export type ILoanDetails = Prisma.PromiseReturnType<typeof fetchLoanDetails>;
export type IAddLoanSchema = zod.infer<typeof addLoanSchema>;
export type ILoanSchemaExtended = zod.infer<typeof loanSchemaExtended>;
export type ILoanType = Prisma.PromiseReturnType<typeof fetchLoans>;

export const repaymentAction = transactionalSchema
  .merge(addLoanSchema.pick({ paymentSched: true, loanId: true }))
  .superRefine((items, ctx) => {
    // Ensure journalLineItems exist
    const totalJournalItems = (items.journalLineItems || []).reduce((acc, curr) => acc + (curr.debit || 0), 0);

    // Ensure paymentSched is not empty
    if (!items.paymentSched || items.paymentSched.length === 0) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Payment schedule is required.',
        path: ['paymentSched'],
      });
      return;
    }

    // Calculate total payments
    const totalPayments = items.paymentSched.reduce((acc, curr) => {
      const principal = Number(curr.principal) || 0;
      const interest = Number(curr.interest) || 0;
      return acc + principal + interest;
    }, 0);

    // Use rounding to avoid floating-point issues
    if (Math.abs(totalPayments - totalJournalItems) > 0.01) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Total payments are not equal to journal line items.',
        path: ['paymentSched'],
      });
    }
  });
export type IRepaymentAction = zod.infer<typeof repaymentAction>;
export type ILoanSources = Prisma.PromiseReturnType<typeof fetchLoanSources>;
