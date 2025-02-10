'ues server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { repaymentAction } from './types';

export const createAmortizationPayment = actionClient
  .schema(repaymentAction)
  .action(async ({ parsedInput: Request }) => {
    try {
      const queryResult = await prisma.$transaction(async (tx) => {

        /**
         * * First batch of query
         */
        const newJournalEntry = await tx.journalEntries.create({
          data: {
            entryDate: Request.entryDate,
            referenceName: Request.reference,
            journalType: Request.journalType,
            referenceType: Request.referenceType,
          },
        });

    //    Request.paymentSched.map((repayments, index)=>{
    //         await tx.loanRepayments.update({
    //             where : {
    //                 repaymentId : repayments.
    //             }
    //         })
    //    })
      });
    } catch (error) {}
  });
