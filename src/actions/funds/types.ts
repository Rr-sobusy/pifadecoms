import { Prisma } from '@prisma/client';
import { z as zod } from 'zod';

import { transactionalSchema } from '../transactional/types';
import { fetchFundTransactions } from './fetch-fund-transaction';
import { fetchMemberFunds } from './fetch-funds';
import { membersStillNotRegistered } from './fetch-members-nofund';
export const memberFundsSchema = transactionalSchema.extend({
  fundId: zod.number(),
  fundType: zod.enum(['Savings', 'ShareCapital']),
  fundTransactionsType: zod.enum(['SavingsDeposit', 'SavingsWithdrawal', 'ShareCapDeposit', 'ShareCapWithdrawal']),
  postedBalance: zod.number(),
});

export const addMemberIntoFundsSchema = zod.object({
  dateAdded: zod.date(),
  member: zod.object({
    memberId: zod.string(),
    lastName: zod.string(),
    firstName: zod.string(),
  }),
  initialSavingsBalance: zod.number(),
  initialShareCapBalance: zod.number(),
});

export type IAddMemberSchema = zod.infer<typeof memberFundsSchema>;
export type IAddMemberIntoFunds = zod.infer<typeof addMemberIntoFundsSchema>
export type MemberFundsType = Prisma.PromiseReturnType<typeof fetchMemberFunds>;
export type FundTransactions = Prisma.PromiseReturnType<typeof fetchFundTransactions>;
export type MembersStillNotListedType = Prisma.PromiseReturnType<typeof membersStillNotRegistered>
