import type { JournalType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
  journalType?: JournalType;
  referenceName?: string;
}

export async function fetchAccountTransactions(props: Filterers) {
  const isEmpty =
    !props.accountId &&
    !props.memberId &&
    !props.startDate &&
    !props.endDate &&
    !props.journalType &&
    !props.referenceName;

  const conditions = [];

  if (props.memberId) {
    conditions.push({
      memberId: props.memberId,
    });
  }

  if (props.journalType) {
    conditions.push({ journalType: props.journalType });
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

  if (props.referenceName) {
    conditions.push({
      referenceName: props.referenceName,
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
        select: {
          memberId: true,
          lastName: true,
          firstName: true,
          middleName: true,
        },
      },
    },
    where: isEmpty ? undefined : { ['AND']: conditions },
    take: !props.startDate && !props.endDate ? 1000 : undefined,
    orderBy: [
      {
        referenceName: 'desc',
      },
      {
        entryDate: 'desc',
      },
    ],
  });

  const sortedJournalEntries = _journalEntries.map((entry) => {
    return {
      ...entry,
      /**
       * * Sort journalLineItems to prioritize debit over credit
       */
      JournalItems: entry.JournalItems.sort((a, b) => (Number(b.debit) ?? 0) - (Number(a.debit) ?? 0)),
    };
  });
  return sortedJournalEntries;
}

export async function fetchSingleAccountTransaction(entryId?: bigint) {
  const journalEntry = await prisma.journalEntries.findUnique({
    include: {
      JournalItems: {
        include: {
          Accounts: true,
        },
      },
      Members: {
        select: {
          memberId: true,
          lastName: true,
          firstName: true,
          middleName: true,
        },
      },
    },
    where: {
      entryId: entryId || BigInt(0),
    },
  });

  return journalEntry;
}
