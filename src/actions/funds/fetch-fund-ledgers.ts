import { FundTransactionsType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

export async function fetchFundLedger(startDate?: Date, endDate?: Date) {
  /**
   * * To be filtered in front end because I can foresee that it will not have a significant scaling problems because
   * * the data from it is not too many.
   */
  const fundTransactionsEntry = await prisma.fundTransactions.findMany({
    where: {
      JournalEntries: {
        entryDate: {
          gte: dayjs(startDate).startOf('day').toDate(),
          lte: dayjs(endDate).endOf('day').toDate(),
        },
      },
    },
    orderBy: {
      JournalEntries: {
        entryDate: 'desc',
      },
    },
    include: {
      MemberFunds: {
        include: {
          Member: {
            select: {
              lastName: true,
              firstName: true,
              middleName: true,
            },
          },
        },
      },
      JournalEntries: {
        select: {
          referenceName: true,
          entryDate: true,
        },
      },
    },
  });
  return fundTransactionsEntry;
}
