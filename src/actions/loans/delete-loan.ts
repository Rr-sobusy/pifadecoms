'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const loanId = zod.number();

export const deleteLoanAction = actionClient.schema(loanId).action(async ({ parsedInput }) => {
  let serverResponse;
  try {
    await prisma.memberLoans.delete({
      where: {
        loanId: BigInt(parsedInput),
      },
    });

    serverResponse = {
      success: true,
      message: 'Loan delete successfully',
    };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: false,
      message: 'Loan occured in server',
    };
  }

  revalidatePath(paths.dashboard.loans.list);
  return serverResponse;
});
