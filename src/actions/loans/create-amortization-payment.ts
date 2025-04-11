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
         * * Create a records in payment amortizations table
         */

        await Promise.all(
          Request.paymentSched.map((repayments) =>
            tx.loanRepayments.createMany({
              data: {
                journalRef: journalEntry.entryId,
                loanId: BigInt(Request.loanId ?? 0),
                paymentSched: repayments.paymentSched,
                principal: repayments.principal,
                interest: repayments.interest,
                paymentDate: journalEntry.entryDate,
              },
            })
          )
        );

        /**
         * * Third batch of query. Adjust account balances depends to their account "rootType".
         * * Increase balance of assets and expense account on debit and decrease in credit.
         * * Increase balance of income, equity and liability on credit and decrease in debit.
         */
        const balanceUpdates = Request.journalLineItems.map((lineItem) => {
          const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
          const amount = lineItem.debit - lineItem.credit;

          return tx.accountsThirdLvl.update({
            where: { accountId: lineItem.accountDetails.accountId },
            data: {
              runningBalance: {
                [isIncrement ? 'increment' : 'decrement']: amount,
              },
            },
          });
        });

        await Promise.all(balanceUpdates);

        return journalEntry;
      });

      serverResponse = { success: true, message: newJournalEntry };
    } catch (error) {
      serverResponse = {
        success: false,
        message: `Error occurred in server! ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }

    revalidatePath(paths.dashboard.loans.view(BigInt(Request.loanId ?? 0)));

    return serverResponse;
  });
