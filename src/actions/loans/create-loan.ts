'use server';

import { revalidatePath } from 'next/cache';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

import { addLoanSchema, loanSchemaExtended } from './types';

export const createNewLoan = actionClient.schema(loanSchemaExtended).action(async ({ parsedInput: Request }) => {
  let serverResponse;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const journalEntry = await tx.journalEntries.create({
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
              repStyle: Request.repStyle,
              repInterval: Request.repInterval,
              amountLoaned: Request.amountLoaned,
              amountPayable : Request.amountPayable,
              interestRate: Request.interest,
              paymentQty: Request.paymentQty,
              issueDate: Request.entryDate,
              dueDate: Request.dueDate,
              sourceId: Request.loanSource,
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
        },
      });

      // Update Balances
      await Promise.all(
        Request.journalLineItems.map((lineItem) => {
          const isIncrement = ['Assets', 'Expense'].includes(lineItem.accountDetails.rootType ?? '');
          const amount = lineItem.debit - lineItem.credit;

          return tx.accountsThirdLvl.update({
            where: {
              accountId: lineItem.accountDetails.accountId,
            },
            data: {
              runningBalance: {
                [isIncrement ? 'increment' : 'decrement']: amount,
              },
            },
          });
        })
      );

      return journalEntry;
    });

    serverResponse = { success: true, message: result };
  } catch (error) {
    serverResponse = { success: false, message: error instanceof Error ? error.message : 'Error occured in server' };
    logger.debug(error);
  }
  revalidatePath(paths.dashboard.loans.list);
  return serverResponse;
});

export const createExistingLoan = actionClient.schema(addLoanSchema).action(async ({ parsedInput: Request }) => {
  let serverResponse;

  try {
    const queryResult = await prisma.memberLoans.create({
      data: {
        memberId: Request.party?.memberId || '',
        amountLoaned: Request.amountLoaned,
        amountPayable: Request.amountPayable,
        interestRate: Request.interest,
        issueDate: Request.issueDate,
        dueDate : Request.dueDate,
        sourceId: Request.loanSource,
        paymentQty: Request.paymentQty,
        repInterval: Request.repInterval,
        repStyle: Request.repStyle,


        Repayments: {
          create: Request.paymentSched.map((repayment) => ({
            paymentSched: repayment.paymentSched,
            principal: repayment.principal,
            interest: repayment.interest,
            paymentDate: repayment.datePaid,
            historicalRef:repayment.historicalRef
          })),
        },
      },
    });

    serverResponse = {
      success: true,
      message: queryResult,
    };
  } catch (error) {
    serverResponse = { sucess: false, message: error instanceof Error ? error.message : 'Error occured in server!' };
    logger.debug(error);
  }

  revalidatePath(paths.dashboard.loans.list);
  return serverResponse;
});
