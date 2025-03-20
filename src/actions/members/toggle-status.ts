'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const memberId = z.string();

export const toggleMemberStats = actionClient.schema(memberId).action(async ({ parsedInput }) => {
  let serverResponse;
  let memberId;

  try {
    const member = await prisma.members.findUnique({
      where: {
        memberId: parsedInput,
      },
    });
    memberId = member?.memberId;

    if (!member) {
      throw new Error('Member not found');
    }

    const queryResult = await prisma.members.update({
      where: {
        memberId: member.memberId,
      },
      data: {
        accountStatus: member.accountStatus === 'Active' ? 'Inactive' : 'Active',
      },
    });

    serverResponse = { success: true, message: 'Member status updated successfully', data: queryResult };
  } catch (error) {
    serverResponse = { success: false, message: error instanceof Error ? error.message : 'An error occurred' };
    logger.debug(error);
  }

  revalidatePath(paths.dashboard.members.view(memberId ?? ''));
  return serverResponse;
});
