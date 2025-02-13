'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { accountTypeSchema } from './types';

export const createParentAccountAction = actionClient
  .schema(accountTypeSchema)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;
    try {
      const queryResult = await prisma.accountsSecondLvl.create({
        data: {
          rootType: Request.rootType,
          rootName: Request.accountTypeName,
        },
      });

      serverResponse = { success: true, message: queryResult };
    } catch (error) {
      serverResponse = { success: false, message: error instanceof Error };
      logger.debug(error);
    }

    revalidatePath(paths.dashboard.finance.types);
    return serverResponse;
  });
