'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberUpdateSchema } from './types';

export const updateMemberStatsAction = actionClient
  .schema(memberUpdateSchema)
  .action(async ({ parsedInput: Request }) => {
    await prisma.members.update({
      where: {
        memberId: Request.memberId,
      },
      data: Request,
    });
  });
