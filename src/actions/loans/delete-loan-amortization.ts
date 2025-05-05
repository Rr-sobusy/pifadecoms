'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const repaymentId = zod.number();

export const deleteLoanAmortizationAction = actionClient.schema(repaymentId).action(async ({ parsedInput }) => {
  let serverResponse;
  try {
    await prisma.loanRepayments.delete({
      where: {
        repaymentId: BigInt(parsedInput),
      },
    });

    serverResponse = {
      success: true,
      message: 'Loan repayment deleted successfully',
    };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: false,
      message: 'Loan occured in server',
    };
  }

  revalidatePath(paths.dashboard.loans.view(BigInt(parsedInput)));
  return serverResponse;
});
