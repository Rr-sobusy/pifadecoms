'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { loanSchemaExtended } from './types';

export const createNewLoan = actionClient.schema(loanSchemaExtended).action(async ({ parsedInput: Request }) => {
  let serverResponse;
  try {
    const queryResult = await prisma.journalEntries.create({
      data: {
        entryDate: Request.entryDate,
        journalType: Request.journalType,
        referenceName: Request.reference,
        referenceType: Request.referenceType,
        memberId: Request.particulars?.memberId ?? '',
        JournalItems: {
          create: Request.journalLineItems.map((item) => ({
            accountId: item.accountDetails.accountId,
            debit: item.debit,
            credit: item.credit,
          })),
        },

        MemberLoans: {
          create: {
            loanType: Request.loanType,
            amountLoaned: Request.amountLoaned,
            amountPayable: Request.amountPayable,
            interestRate: Request.interest,
            termInMonths: Request.termsInMonths,
            issueDate: Request.entryDate,
            sourceId: Request.loanSource,
            dueDate: Request.dueDate,
            isExisting: Request.isExisting,
            memberId: Request.particulars?.memberId ?? '',

            Repayments: {
              create: Request.paymentSched.map((payment) => ({
                paymentDate: payment.datePaid,
                principal: payment.principal,
                interest: payment.interest,
                paymentSched: payment.paymentSched,
              })),
            },
          },
        },

        /**
         * * Adjust account balances depends to their account "rootType".
         */
        ...Request.journalLineItems.map((lineItem) => {
          const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
          const amount = lineItem.debit - lineItem.credit;
  
          return prisma.accountsThirdLvl.update({
            where: {
              accountId: lineItem.accountDetails.accountId,
            },
            data: {
              runningBalance: {
                [isIncrement ? 'increment' : 'decrement']: amount,
              },
            },
          });
        }),
      },
    });
    serverResponse = { success: true, message: queryResult };
  } catch (error) {
    if (error instanceof Error) {
      serverResponse = { success: false, message: error.message };
    }
  }
  revalidatePath(paths.dashboard.loans.list);
  return serverResponse;
});
