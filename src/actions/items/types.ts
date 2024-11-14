import { Prisma } from '@prisma/client';
import { z } from 'zod';

import type { AccountType } from '@/actions/accounts/types';

import { fetchItems } from './fetch-items';

export type ItemTypes = Prisma.PromiseReturnType<typeof fetchItems>;

export const itemSchema = z.object({
  itemName: z.string(),
  itemDescription: z.string().optional(),
  itemType: z.enum(['product', 'services']),
  sellingPrice: z.number().gt(0, { message: 'Selling price must greather than 0.' }),
  costPrice: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenseAcct: z
    .object({
      accountId: z.string(),
      accountName: z.string(),
      accountRootType: z.string(),
    })
    .optional(),
  incomeAcct: z
    .object({
      accountId: z.string(),
      accountName: z.string(),
      accountRootType: z.string(),
    })
    .optional(),
});

export type ItemsSchemaType = z.infer<typeof itemSchema>;
