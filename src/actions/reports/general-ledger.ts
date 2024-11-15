import { type Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

type LedgerType = {
  dateRange?: { startDate: string; endDate: string };
};

export async function fetchLedgers({ dateRange }: LedgerType) {

  /**
   * * Fetch the records for the previous 30 days when there is no given parameters in dateRange
   */ 
  
  const accountLedgers = await prisma.journalItems.groupBy({
    by: ['accountId'],
    _sum: { debit: true, credit: true },
    where: {
      JournalEntries: {
        entryDate: {
          lte:
          dateRange?.endDate === undefined
          ? dayjs().endOf('day').toISOString()
          : dayjs(dateRange?.endDate).endOf('day').toISOString(),
          gte:
            dateRange?.startDate === undefined
              ? dayjs().subtract(30, 'day').startOf('day').toISOString()
              : dayjs(dateRange?.startDate).startOf('day').toISOString(),
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
