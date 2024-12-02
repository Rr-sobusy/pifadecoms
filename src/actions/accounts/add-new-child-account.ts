'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { accountSchema } from './types';

export const createNewAccount = actionClient.schema(accountSchema).action(async ({ parsedInput: AccountSchema }) => {
  let queryResult;
  try {
    const newAccount = await prisma.accountsThirdLvl.create({
      data: {
        accountName: AccountSchema.accountName,
        rootId: AccountSchema.rootId.rootId,
        openingBalance: AccountSchema.openingBalance,
        runningBalance: AccountSchema.openingBalance,
      },
    });

    queryResult = { success: true, message: newAccount };
  } catch (error) {
    queryResult = { sucesss: false, errorMessage: JSON.stringify(error) };
  }
  revalidatePath(paths.dashboard.finance.list);
  return queryResult;
});
