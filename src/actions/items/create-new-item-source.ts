'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { itemSourceSchema } from './types';
import { revalidatePath } from 'next/cache';
import { paths } from '@/paths';

export const createNewItemSourceAction = actionClient
  .schema(itemSourceSchema)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;

    try {
      const queryResult = await prisma.itemSource.create({
        data: {
          sourceName: Request.sourceName,
          defaultAccount: Request.accountDetails.accountId ?? '',
        },
      });

      serverResponse = { success: true, message: `New source created!. ${queryResult.sourceName}` };
    } catch (error) {
      if (error instanceof Error) {
        serverResponse = { success: false, message: error.stack };
      }
    }
    revalidatePath(paths.dashboard.items.source)
    return serverResponse;
  });
