import { type Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

export async function fetchAccountTransactions() {
  const accountTransactions = await prisma.journalItems.findMany({
    include: {
      JournalEntries: true,
      Accounts: true,
    },
  });

  return accountTransactions;
}
