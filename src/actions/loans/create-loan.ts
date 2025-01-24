'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { loanSchemaExtended } from './types';

export const createNewLoan = actionClient.schema(loanSchemaExtended).action(async ({ parsedInput: Request }) => {
  const queryResult = await prisma.journalEntries.create({
    data: {
      entryDate: Request.entryDate,
      journalType: Request.journalType,
      referenceName: Request.reference,
      referenceType: Request.referenceType,

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
          interestRate: Request.interest,
          termInMonths: Request.termsInMonths,
          issueDate: Request.entryDate,
          dueDate: Request.dueDate,
          isExisting: Request.isExisting,
          memberId: Request.particulars?.memberId ?? '',

          Repayments: {
            create: Request.paymentSched.map((payment) => ({
              paymentDate: payment.datePaid,
              principal: payment.principal,
              interest: payment.interest,
              amountDue: 2000,
              paymentSched: payment.paymentSched,
            })),
          },
        },
      },
    },
  });
});
