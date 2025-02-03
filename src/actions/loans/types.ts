import { z as zod } from 'zod';

import { transactionalSchema } from '../transactional/types';
import { fetchLoans, fetchLoanDetails} from './fetch-loans';
import { Prisma } from '@prisma/client';
export const addLoanSchema = zod.object({
  loanType: zod.enum(['Weekly', 'Monthly', 'Yearly', 'Diminishing', 'EndOfTerm']),
  member: zod.object({
    memberId: zod.string(),
  }).optional(),
  amountLoaned: zod.number(),
  amountPayable: zod.number(),
  interest: zod.number(),
  termsInMonths: zod.number(),
  issueDate:zod.date().optional(),
  dueDate: zod.date(),
  isExisting: zod.boolean().default(false),
  ledgerId: zod.bigint().optional(),
  paymentSched: zod.array(zod.object({
    paymentSched: zod.date(),
    principal: zod.number(),
    interest: zod.number(),
    datePaid: zod.date().optional(),
    amountPaid: zod.number().optional(),
    balance: zod.number().optional(),
    isExisitng:zod.boolean().default(false),
  }))
})

export const loanSchemaExtended = transactionalSchema.merge(addLoanSchema);
export type ILoanDetails = Prisma.PromiseReturnType<typeof fetchLoanDetails>
export type IAddLoanSchema = zod.infer<typeof addLoanSchema>;
export type ILoanSchemaExtended = zod.infer<typeof loanSchemaExtended>;
export type ILoanType = Prisma.PromiseReturnType<typeof fetchLoans>;