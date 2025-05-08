import dayjs from 'dayjs';
import Decimal from 'decimal.js';

import prisma from '@/lib/prisma';

type JournalItemLite = {
  accountId: string;
  debit: Decimal | string | number;
  credit: Decimal | string | number;
};

type AccountTransaction = {
  entryId: bigint;
  entryDate: Date;
  journalType: string;
  memberId: string | null;
  JournalItems: JournalItemLite[];
};

type AccountTransactionTypes = AccountTransaction[];

function createEntryKey(entry: AccountTransaction) {
  return [dayjs(entry.entryDate).format('YYYY-MM'), entry.journalType, entry.memberId ?? 'NULL'].join('|');
}

function hashJournalItems(items: JournalItemLite[]): string {
  const sorted = [...items].sort((a, b) => a.accountId.localeCompare(b.accountId));
  return sorted
    .map((i) => `${i.accountId}:${new Decimal(i.debit).toFixed(2)}:${new Decimal(i.credit).toFixed(2)}`)
    .join('|');
}

function detectDuplicateJournalEntries(entries: AccountTransactionTypes) {
  const seen = new Map<string, AccountTransaction>();
  const duplicates: [AccountTransaction, AccountTransaction][] = [];

  for (const entry of entries) {
    const metaKey = createEntryKey(entry);
    const itemHash = hashJournalItems(entry.JournalItems);
    const fullKey = `${metaKey}::${itemHash}`;

    if (seen.has(fullKey)) {
      duplicates.push([seen.get(fullKey)!, entry]);
    } else {
      seen.set(fullKey, entry);
    }
  }

  return duplicates;
}

export async function fetchDoubleEntryPosted(fromDate?: Date, toDate?: Date) {
  const entries = await prisma.journalEntries.findMany({
    where: {
      entryDate: {
        gte: fromDate ? dayjs(fromDate).startOf('day').toDate() : dayjs().startOf('month').toDate(),
        lte: toDate ? dayjs(toDate).endOf('day').toDate() : dayjs().endOf('month').toDate(),
      },
    },
    include: {
      JournalItems: true,
      Members: true,
    },
  });

  if (!entries) {
    return [];
  }

  const duplicates = detectDuplicateJournalEntries(entries);

  if (duplicates.length > 0) {
    const duplicatePostings = duplicates.map(([a, b]) => ({
      first: `Entry Date: ${dayjs(a.entryDate).format('MMM DD YYYY')} Transaction #:${String(a.entryId)}`,
      second: `Entry Date: ${dayjs(b.entryDate).format('MMM DD YYYY')} Transaction #:${String(b.entryId)}`,
    }));
    return duplicatePostings;
  } else {
    return [];
  }
}

// export async function compareEntriesByMonth(fromDate: Date, toDate: Date) {
//   // Fetch entries from the specified date range
//   const entries = await prisma.journalEntries.findMany({
//     where: {
//       entryDate: {
//         gte: fromDate,
//         lte: toDate,
//       },
//     },
//     include: {
//       JournalItems: true,
//     },
//   });

//   // Detect duplicates
//   const duplicates = detectDuplicateJournalEntries(entries);

//   if (duplicates.length > 0) {
//     // Log or return the duplicate entries
//     const duplicatePostings = duplicates.map(([a, b]) => ({
//       first: stringify({ firstEntry: a.entryId, secondEntry: b.entryId }),
//       second: stringify(b),
//     }));
//     return duplicatePostings;
//   }

//   return 'No duplicate entries found for the month.';
// }
