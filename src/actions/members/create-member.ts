'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberSchema } from './types';

export const createNewMember = actionClient.schema(memberSchema).action(async ({ parsedInput: _newMember }) => {
  try {
    const newMember = await prisma.members.create({
      data: _newMember,
    });
    console.log(newMember)
    return { message: 'New member created!', data: newMember };
  } catch (error) {
    console.error({ message: 'Error occureded in server:' + error });
  }
  revalidatePath(paths.dashboard.members.list);
});
