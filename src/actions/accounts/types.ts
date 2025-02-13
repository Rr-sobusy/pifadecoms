import type { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchAccountTree, fetchChartofAccounts } from './fetch-accounts';

export const accountSchema = z.object({
  rootId: z.object({
    rootId: z.number(),
    rootName: z.string(),
    rootType: z.string().nullable(),
  }),
  accountName: z.string(),
  openingBalance: z.number(),
});

export const accountTypeSchema = z.object({
  rootType: z.enum(['Assets', 'Liability', 'Equity', 'Revenue', 'Expense', 'Contra_Assets']),
  accountTypeName: z.string(),
});

export type AccountSchemaType = z.infer<typeof accountSchema>;

export type AccountType = Prisma.PromiseReturnType<typeof fetchChartofAccounts>;

export type AccounTreeType = Prisma.PromiseReturnType<typeof fetchAccountTree>;

export type AccountTypeSchema = z.infer<typeof accountTypeSchema>
