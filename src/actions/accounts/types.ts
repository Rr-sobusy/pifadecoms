import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchChartofAccounts } from './fetch-accounts';

export const accountSchema = z.object({
  rootId: z.object({
    rootId: z.number(),
    rootName: z.string(),
    rootType: z.string().nullable()
  }),
  accountName: z.string(),
  openingBalance: z.number(),
});

export type AccountSchemaType = z.infer<typeof accountSchema>;

export type AccountType = Prisma.PromiseReturnType<typeof fetchChartofAccounts>;
