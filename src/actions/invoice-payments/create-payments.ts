'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



import { asyncHandler } from '@/lib/api-utils/asyncHandler';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';



import { paymentSchema } from './types';

export const createPaymentPosting = actionClient.schema(paymentSchema).action(async ({ parsedInput: Request }) => {
  try {
    // const paymentPosted = await prisma.journalEntries.create({
    //   data: {
    //     entryDate: Request.entryDate,
    //     referenceName: Request.orNo,
    //     JournalItems: {
    //             create : Request.journalLineItems.map((lineItem)=>({
    //                 accountId: lineItem.accountDetails.accountId,
    //                 debit : lineItem.debit,
    //                 credit: lineItem.credit
    //             }))
    //     },
    //   },
    // });
    Request.journalLineItems.map((lineItem)=> console.log(lineItem.accountDetails.accountId))
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Known Prisma error (e.g., constraint violations, database errors)
      console.error('Prisma error code:', error.code);
      console.error('Error message:', error.message);
    } else {
      // Unknown error
      console.error('Unknown error:', error);
    }
  }
});