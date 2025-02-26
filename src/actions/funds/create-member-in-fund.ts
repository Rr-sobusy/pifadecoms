/**
 * * This action will not trigger posting so we are not extending the transactional entries schema.
 * * If the member is already have share capital and savings balance, we must input directly their running balances.
 * * If the members is newly registered, we must make their balance '0' and then add funds using corresponding action in -
 * * member funds dashboard to create journal listings.
 */
'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { addMemberIntoFundsSchema } from './types';

export const createMemberIntoFunds = actionClient.schema(addMemberIntoFundsSchema).action(async ({ parsedInput: Request }) => {
  let queryResult;
  try {
    const newMember = await prisma.memberFunds.create({
      data: {
        createdAt: Request.dateAdded,
        memberId: Request.member.memberId,
        shareCapBal: Request.initialShareCapBalance,
        savingsBal: Request.initialSavingsBalance,
        updatedAt : Request.dateAdded
      },
    });
    queryResult = { sucess: true, message: newMember };
  } catch (error) {
    queryResult = { success: false, errorMessage: JSON.stringify(error) };
  }
  revalidatePath(paths.dashboard.funds.list);
  return queryResult
});
