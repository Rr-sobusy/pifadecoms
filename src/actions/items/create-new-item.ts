'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import { asyncHandler } from '@/lib/api-utils/asyncHandler';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { itemSchema } from './types';

export const createNewItems = actionClient.schema(itemSchema).action(async ({ parsedInput: Request }) => {
  try {
    await prisma.items.create({
      data: {
        itemName: Request.itemName,
        itemDescription: Request.itemDescription,
        costPrice: Request.costPrice,
        sellingPrice: Request.sellingPrice,
        itemType: Request.itemType,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath(paths.dashboard.items.list);
  redirect(paths.dashboard.items.list);
});
