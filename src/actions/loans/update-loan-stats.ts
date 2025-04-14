'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const updateLoanStatsSchema = z.bigint();

export const updateLoanStats = actionClient.schema(updateLoanStatsSchema).action(async ({ parsedInput }) => {
  let serverResponse;
  try {
    const loanDetails = await prisma.memberLoans.findUnique({
      where: { loanId: parsedInput },
    });

    if (!loanDetails) {
      logger.debug('No loan record found!');
      return;
    }

    await prisma.memberLoans.update({
      where: {
        loanId: parsedInput,
      },
      data: {
        loanStatus: loanDetails.loanStatus === 'Active' ? 'Closed' : 'Active',
      },
    });

    serverResponse = { success: true, message: 'Loan status updated successfully!' };
  } catch (error) {
    logger.debug('Error updating loan stats', error);
    serverResponse = { success: false, message: 'Error updating loan stats' };
  }

  revalidatePath(paths.dashboard.loans.view(parsedInput));
  return serverResponse;
});
