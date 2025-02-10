'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { repaymentAction } from './types';

export const createAmortizationPayment = actionClient
  .schema(repaymentAction)
  .action(async ({ parsedInput: Request }) => {
    let serverResponse;

    try {
      const newJournalEntry = await prisma.$transaction(async (tx) => {
        /**
         * * First batch of query - Creating Journal Entry
         */
        const journalEntry = await tx.journalEntries.create({
          data: {
            entryDate: Request.entryDate,
            referenceName: Request.reference,
            journalType: Request.journalType,
            referenceType: Request.referenceType,
            memberId: Request.particulars?.memberId,

            JournalItems: {
              create: Request.journalLineItems.map((journalLine) => ({
                accountId: journalLine.accountDetails.accountId,
                debit: journalLine.debit,
                credit: journalLine.credit,
              })),
            },
          },
        });

        /**
         * * Update records in loan repayments
         */
        await Promise.all(
          Request.paymentSched.map((repayments) =>
            tx.loanRepayments.updateMany({
              where: { repaymentId: repayments.repaymentId },
              data: {
                journalRef: journalEntry.entryId,
                principal: repayments.principal,
                interest: repayments.interest,
                paymentDate: Request.entryDate,
              },
            })
          )
        );

        return journalEntry;
      });

      serverResponse = { success: true, message: newJournalEntry };
    } catch (error) {
      console.error('Error in createAmortizationPayment:', error);

      serverResponse = {
        success: false,
        message: `Error occurred in server! ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }

  
    revalidatePath(paths.dashboard.loans.view(BigInt(Request.loanId ?? 0)));

    return serverResponse;
  });
