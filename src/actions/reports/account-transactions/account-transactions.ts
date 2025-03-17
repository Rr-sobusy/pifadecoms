import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
}

export async function fetchAccountTransactions(props: Filterers ) {
  const isEmpty = !props.accountId && !props.memberId && !props.startDate && !props.endDate;

  const conditions = [];

  if (props.memberId) {
    conditions.push({
      memberId: props.memberId,
    });
  }

  if (props.accountId) {
    conditions.push({
      JournalItems: {
        some: {
          accountId: props.accountId,
        },
      },
    });
  }

  if (props.startDate || props.endDate) {
    conditions.push({
      entryDate: {
        ...(props.startDate && { gte: dayjs(props.startDate).startOf('day').toISOString() }),
        ...(props.endDate && { lte: dayjs(props.endDate).endOf('day').toISOString() }),
      },
    });
  }

  const _journalEntries = await prisma.journalEntries.findMany({
    include: {
      JournalItems: {
        include: {
          Accounts: true,
        },
      },
      Members: {
        select : {
          memberId : true,
          lastName : true,
          firstName : true,
          middleName : true,
        }
      },
    },
    where: isEmpty ? undefined : { ["AND"]: conditions },
    orderBy: [
      {
        entryDate : "desc"
      },
      {
        referenceName: 'desc',
      },
    ],
  });

  const sortedJournalEntries = _journalEntries.map((entry) => {
    return {
      ...entry,
      JournalItems: entry.JournalItems.sort((a, b) => {
        if (a.debit && !b.debit) return -1;
        if (!a.debit && b.debit) return 1;
        return 0;
      }),
    };
  });
  return sortedJournalEntries;
}
