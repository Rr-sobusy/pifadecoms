'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const updateNotesSchema = zod.object({
  loanId: zod.bigint(),
  notes: zod.string().max(500),
});

export const updateNotesAction = actionClient.schema(updateNotesSchema).action(async ({ parsedInput: Request }) => {
  let serverResponse;

  try {
    await prisma.memberLoans.update({
      where: {
        loanId: Request.loanId,
      },
      data: {
        notes: Request.notes,
      },
    });

    serverResponse = {
      success: true,
      message: 'Notes updated successfully',
    };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: false,
      message: 'Failed to update notes',
    };
  }

  revalidatePath(paths.dashboard.loans.view(Request.loanId));
  return serverResponse;
});
