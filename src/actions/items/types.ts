import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchItemSources } from './fetch-item-sources';
import { fetchItems } from './fetch-items';

export type ItemTypes = Prisma.PromiseReturnType<typeof fetchItems>;

export const itemSchema = z.object({
  itemName: z.string(),
  itemDescription: z.string().optional(),
  itemType: z.enum(['product', 'services']),
  principalPrice: z.number(),
  trade: z.number(),
  createdAt: z.date().optional(),
  sourceId: z.number(),
  updatedAt: z.date().optional(),
});

export const itemSourceSchema = z.object({
  sourceName: z.string(),

  //default account
  accountDetails: z.object({
    accountId: z.string(),
    accountName: z.string(),
    group: z.string()
  }),
});

export type ItemsSchemaType = z.infer<typeof itemSchema>;
export type ItemSourcesType = Prisma.PromiseReturnType<typeof fetchItemSources>;
export type ItemSourceSchemaType = z.infer<typeof itemSourceSchema>