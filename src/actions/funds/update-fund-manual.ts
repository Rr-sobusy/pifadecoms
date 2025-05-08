'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const updateFundManualSchema = zod.object({
  fundId: zod.number(),
  fundType: zod.enum(['savings', 'share']),
  newBalance: zod.number(),
});

export const updateFundManualAction = actionClient
  .schema(updateFundManualSchema)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;
    try {
      await prisma.memberFunds.update({
        where: {
          fundId: Request.fundId,
        },
        data: {
          savingsBal: Request.fundType === 'savings' ? Request.newBalance : undefined,
          shareCapBal: Request.fundType === 'share' ? Request.newBalance : undefined,
        },
      });

      serverResponse = {
        success: true,
        message: 'Member fund updated successfully.',
      };
    } catch (error) {
      logger.debug(error);
      serverResponse = {
        success: false,
        message: 'Error occured in server',
      };
    }

    revalidatePath(paths.dashboard.funds.view(Request.fundId));
    return serverResponse;
  });
