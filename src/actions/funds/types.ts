import { Prisma } from '@prisma/client';

import { fetchMemberFunds } from './fetch-funds';

export type MemberFundsType = Prisma.PromiseReturnType<typeof fetchMemberFunds>;
