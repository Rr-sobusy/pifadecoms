import { Prisma } from '@prisma/client';

import { fetchMemberFunds } from './fetch-funds';
import { fetchFundTransactions } from './fetch-fund-transaction';

export type MemberFundsType = Prisma.PromiseReturnType<typeof fetchMemberFunds>;
export type FundTransactions = Prisma.PromiseReturnType<typeof fetchFundTransactions>
