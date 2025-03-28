'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberUpdateSchema } from './types';

export const updateMemberStatsAction = actionClient
  .schema(memberUpdateSchema)
  .bindArgsSchemas<[memberId: zod.ZodString]>([zod.string()])
  .action(async ({ parsedInput: Request, bindArgsParsedInputs }) => {
    let serverResponse;
    try {
      await prisma.members.update({
        where: {
          memberId: bindArgsParsedInputs[0],
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

    revalidatePath(paths.dashboard.members.view(bindArgsParsedInputs[0]));
    return serverResponse;
  });
