'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { addLoanSourceSchema } from './types';

export const addLoanSourceAction = actionClient.schema(addLoanSourceSchema).action(async ({ parsedInput: Request }) => {
  let serverResponse;
  try {
    await prisma.loanSource.create({
      data: {
        sourceName: Request.sourceName,
        defaultAccount: Request.accountDetails.accountId,
      },
    });
    serverResponse = {
      success: true,
      message: 'New loan source created.',
    };
  } catch (error) {
    serverResponse = {
      success: false,
      message: 'Error occured in server.',
    };
    logger.debug(error);
  }

  revalidatePath(paths.dashboard.loans.source);
  return serverResponse;
});
