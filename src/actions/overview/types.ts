import { Prisma } from '@prisma/client';

import { fetchTopMovingItemInLast30Days } from './fetch-top-products';
import { fetchTopStockHolders } from './fetch-top-stock-holders';

export type TopStockHoldersType = Prisma.PromiseReturnType<typeof fetchTopStockHolders>;
export type TopMovingItemsType = Prisma.PromiseReturnType<typeof fetchTopMovingItemInLast30Days>;
