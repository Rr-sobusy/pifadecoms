import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchAccountTree, fetchChartofAccounts } from './fetch-accounts';
import { createZodSchema } from '@/lib/zodSchema-helper';

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

export type AccounTreeType = Prisma.PromiseReturnType<typeof fetchAccountTree>


