import dayjs from 'dayjs';
import Decimal from 'decimal.js'; // or from Prisma if needed
import { stringify } from 'json-bigint';

import prisma from '@/lib/prisma';

type JournalItemLite = {
  accountId: string;
  debit: Decimal | string | number;
  credit: Decimal | string | number;
};

type AccountTransaction = {
  entryId: bigint;
  entryDate: Date;
  referenceName: string;
  journalType: string;
  memberId: string | null;
  JournalItems: JournalItemLite[];
};

type AccountTransactionTypes = AccountTransaction[];

function createEntryKey(entry: AccountTransaction) {
  return [
    dayjs(entry.entryDate).format('YYYY-MM-DD'),
    entry.referenceName,
    entry.journalType,
    entry.memberId ?? 'NULL',
  ].join('|');
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

export async function fetchDoubleEntryPosted(fromDate: Date, toDate: Date) {
  const entries = await prisma.journalEntries.findMany({
    where: {
      entryDate: {
        gte: fromDate,
        lte: toDate,
      },
    },
    include: {
      JournalItems: true,
    },
  });

  const duplicates = detectDuplicateJournalEntries(entries);

  if (duplicates.length > 0) {
    const duplicatePostings = []
    for (const [a, b] of duplicates) {
        duplicatePostings.push({first: stringify(a), second: stringify(b)})
      }

      return duplicatePostings
  } else {
    console.log('No duplicates detected');
  }
}
