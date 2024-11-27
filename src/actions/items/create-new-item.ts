'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { itemSchema } from './types';

export const createNewItems = actionClient.schema(itemSchema).action(async ({ parsedInput: Request }) => {
  try {
    const queryResponse = await prisma.items.create({
      data: {
        itemName: Request.itemName,
        itemDescription: Request.itemDescription,
        costPrice: Request.costPrice,
        sellingPrice: Request.sellingPrice,
        itemType: Request.itemType,
      },
    });

    return { success: true, message: queryResponse };
  } catch (error) {
    return { success: false, errorMessage: error };
  } finally {
    revalidatePath(paths.dashboard.items.list);
    redirect(paths.dashboard.items.list);
  }
});
