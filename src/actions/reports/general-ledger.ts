import { type Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

type LedgerType = {
  dateRange?: { startDate: Dayjs; endDate: Dayjs };
};

export async function fetchLedgers({ dateRange = { startDate: dayjs(), endDate: dayjs() } }: LedgerType) {
  const accountLedgers = await prisma.journalItems.groupBy({
    by: ['accountId'],
    _sum: { debit: true, credit: true },
    where: {
      JournalEntries: {
        entryDate: {
          lte: dayjs(dateRange?.endDate).endOf('day').toISOString(),
          gte: dayjs(dateRange?.startDate).startOf('day').toISOString(),
        },
      },
    },
  });

  const accountIds = accountLedgers.map((ledger) => ledger.accountId);

  const chartOfAccounts = await prisma.accountsThirdLvl.findMany({
    where: {
      accountId: {
        in: [...accountIds],
      },
    },
    select: {
      accountName: true,
      accountId: true,
    },
  });

  const fullLedgers = accountLedgers.map((ledger) => ({
    ...ledger,
    account: chartOfAccounts.find((account) => account.accountId === ledger.accountId),
  }));

  // * sort the ledger's into accountName alphabetically before returning
  return fullLedgers.sort((a, b) => {
    const nameA = a.account?.accountName ?? '';
    const nameB = b.account?.accountName ?? '';
    return nameA.localeCompare(nameB);
  });
}
