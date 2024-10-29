import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchChartofAccounts } from './fetch-accounts';

export const AccountSchema = z.object({
    accountName: z.string(),
    
})


export type AccountType = Prisma.PromiseReturnType<typeof fetchChartofAccounts>;
