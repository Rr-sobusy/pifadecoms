import { JournalType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface FilterProps {
  month: string;
  journalType?: JournalType | 'All';
  memberId: string;
}

export async function fetchMemberPatronages({ month, journalType = 'cashDisbursement', memberId }: FilterProps) {
  /**
   * * Fetch the records for the previous 30 days when there is no given parameters in dateRange
   */

  const startDate = dayjs('3', 'YYYY-MM').startOf('month').toDate();
  const endDate = dayjs('3', 'YYYY-MM').endOf('month').toDate();

  const accountLedgers = await prisma.journalItems.groupBy({
    by: ['accountId'],
    _sum: { debit: true, credit: true },
    where: {
      JournalEntries: {
        entryDate: { gte: startDate, lt: endDate },
        journalType: 'cashReceipts',
        memberId: memberId,
      },
      Accounts: {
        RootID: {
          OR: [{ rootType: 'Assets' }, { rootType: 'Revenue' }],
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
