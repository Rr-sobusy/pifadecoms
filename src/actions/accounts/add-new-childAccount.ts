'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { accountSchema } from './types';

export const createNewAccount = actionClient.schema(accountSchema).action(async ({ parsedInput: AccountSchema }) => {
  try {
    const newAccount = await prisma.accountsThirdLvl.create({
      data: {
        accountName: AccountSchema.accountName,
        rootId: AccountSchema.rootId.rootId,
      },
    });

    return { message: 'New financial account created!', data: newAccount };
  } catch (error) {
    console.error({ message: 'Error occured in server!', error: error });
  }

  revalidatePath(paths.dashboard.finance.list);
});
