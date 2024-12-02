'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
        costPrice: Request.costPrice,
        sellingPrice: Request.sellingPrice,
        itemType: Request.itemType,
      },
    });

    queryResponse = { success: true, message: newItem };
  } catch (error) {
    queryResponse = { success: false, errorMessage: JSON.stringify(error) };
  }
  revalidatePath(paths.dashboard.items.list);
  return queryResponse;
});
