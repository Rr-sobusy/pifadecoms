'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberSchema } from './types';

export const createNewMember = actionClient.schema(memberSchema).action(async ({ parsedInput: _newMember }) => {
  try {
    const newMember = await prisma.members.create({
      data: _newMember,
    });
    return { success: true, message: newMember };
  } catch (error) {
    return { success: false, errorMessage: error };
  } finally {
    revalidatePath(paths.dashboard.members.list);
  }
});
