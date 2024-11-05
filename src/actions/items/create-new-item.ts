'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { asyncHandler } from '@/lib/api-utils/asyncHandler';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { itemSchema } from './types';

export const createNewItems = actionClient.schema(itemSchema).action(
  asyncHandler(async ({ parsedInput: Schema }) => {
    const newItem = await prisma.items.create({
      data: {
        itemName: Schema.itemName,
        itemDescription: Schema.itemDescription,
        costPrice: Schema.costPrice,
        sellingPrice: Schema.sellingPrice,
        itemType: Schema.itemType,
        expenseAcct: Schema.expenseAcct?.accountId,
        incomeAcct: Schema.incomeAcct?.accountId,
        inventoryAcct: Schema.inventoryAcct?.accountId,
        interestAcct: Schema.interestAcct?.accountId,
        receivableAcct: Schema.receivableAcct?.accountId,
        tradingAcct: Schema.traddingAcct?.accountId,
      },
    });

    revalidatePath(paths.dashboard.items.list);
    return {
      success: true,
      message: `New item created: ${newItem}`,
    };
  })
);
