import { Prisma } from '@prisma/client';
import { z as zod } from 'zod';

import { transactionalSchema } from '../transactional/types';
import { fetchFundTransactions } from './fetch-fund-transaction';
import { fetchMemberFunds } from './fetch-funds';

export const memberFundsSchema = transactionalSchema.extend({
  fundId: zod.number(),
  fundType: zod.enum(['Savings', 'ShareCapital']),
  fundTransactionsType: zod.enum(['SavingsDeposit', 'SavingsWithdrawal', 'ShareCapDeposit', 'ShareCapWithdrawal']),
  postedBalance: zod.number(),
});

export type IAddMemberSchema = zod.infer<typeof memberFundsSchema>
export type MemberFundsType = Prisma.PromiseReturnType<typeof fetchMemberFunds>;
export type FundTransactions = Prisma.PromiseReturnType<typeof fetchFundTransactions>;
