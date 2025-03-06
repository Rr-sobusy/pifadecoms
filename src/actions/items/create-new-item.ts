'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { itemSchema } from './types';

export const createNewItems = actionClient.schema(itemSchema).action(async ({ parsedInput: Request }) => {
  let queryResponse;
  try {
    const newItem = await prisma.items.create({
      data: {
        itemName: Request.itemName,
        itemDescription: Request.itemDescription,
        sellingPrice: Request.principalPrice,
        trade: Request.trade,
        sourceId: Request.sourceId,
        itemType: Request.itemType,
      },
    });

    queryResponse = { success: true, message: newItem };
  } catch (error) {
    queryResponse = { success: false, errorMessage: error instanceof Error ? error.stack : 'Error occured in server!' };
  }
  revalidatePath(paths.dashboard.items.list);
  return queryResponse;
});
