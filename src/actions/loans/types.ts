import { z as zod } from 'zod';

import { transactionalSchema } from '../transactional/types';

export const addLoanSchema = zod.object({
  loanType: zod.enum(['Weekly', 'Monthly', 'Yearly', 'Diminishing', 'EndOfTerm']),
  member: zod.object({
    memberId: zod.string(),
  }).optional(),
  amountLoaned: zod.number(),
  interest: zod.number(),
  termsInMonths: zod.number(),
  issueDate: zod.date(),
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


export type IAddLoanSchema = zod.infer<typeof addLoanSchema>;