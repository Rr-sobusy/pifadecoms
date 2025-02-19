import { JournalType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface FilterProps {
  dateRange: { startDate: string | Date; endDate: string | Date };
  journalType: JournalType | 'All';
}

export async function fetchLedgers({
  dateRange = { endDate: dayjs().toDate(), startDate: dayjs().toDate() },
  journalType = 'cashDisbursement',
}: FilterProps) {
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
        journalType: journalType === 'All' ? undefined : journalType,
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
      RootID: {
        select: {
          rootType: true,
        },
      },
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
