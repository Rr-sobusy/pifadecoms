'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { updateItemSchema } from './types';

export const updateItemAction = actionClient.schema(updateItemSchema).action(async ({ parsedInput: Request }) => {
  let serverResponse;

  try {
    await prisma.items.update({
      where: {
        itemID: Request.itemId,
      },
      data: {
        trade: Request.trade,
        sellingPrice: Request.principalPrice,
      },
    });
    serverResponse = { success: true, message: 'Item updated.' };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: true,
      message: error instanceof Error ? `Error message: ${error.stack}` : 'Error occured in server.',
    };
  }

  revalidatePath(paths.dashboard.items.list);
  return serverResponse;
});
