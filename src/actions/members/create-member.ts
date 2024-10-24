'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { memberSchema } from './types';

export const createNewMember = actionClient.schema(memberSchema).action(async ({ parsedInput: Member }) => {
  try {
    const newMember = await prisma.members.create({
      data: {
        lastName: Member.lastName,
        firstName: Member.firstName,
        address: Member.address,
        birthDate: new Date(Member.birthDate),
        gender: Member.gender,
        contactNo: Member.contactNo,
        occupation: Member.occupation,
      },
    });
  } catch (error) {
    console.error({ message: 'Error occureded in server:' + error });
  }

  revalidatePath(paths.dashboard.members.list);
});
