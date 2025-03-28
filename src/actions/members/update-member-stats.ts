'use server';

import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberUpdateSchema } from './types';

export const updateMemberStatsAction = actionClient
  .schema(memberUpdateSchema)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;
    try {
      await prisma.members.update({
        where: {
          memberId: Request.memberId,
        },
        data: Request,
      });

      serverResponse = { success: true, message: 'Member data updated!' };
    } catch (error) {
      serverResponse = {
        success: false,
        message: error instanceof Error ? `Error message: ${error.stack}` : 'Error occured in server.',
      };
      logger.debug(error);
    }
  });
