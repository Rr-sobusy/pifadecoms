import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
}

export async function fetchAccountTransactions(props: Filterers = {}) {
  const isEmpty = !props.accountId && !props.memberId && !props.startDate && !props.endDate;

  const conditions = [];

  if (props.memberId) {
    conditions.push({
      JournalEntries: {
        memberId: props.memberId,
      },
    });
  }

  if (props.accountId) {
    conditions.push({ accountId: props.accountId });
  }

  if (props.startDate || props.endDate) {
    conditions.push({
      JournalEntries: {
        entryDate: {
          ...(props.startDate && { gte: dayjs(props.startDate).startOf('day').toISOString() }),
          ...(props.endDate && { lte: dayjs(props.endDate).endOf('day').toISOString() }),
        },
      },
    });
  }

  const accountTransactions = await prisma.journalItems.findMany({
    include: {
      JournalEntries: {
        include: {
          Members: true,
        },
      },
      Accounts: true,
    },
    where: isEmpty ? undefined : { OR: conditions },
  });

  return accountTransactions;
}
