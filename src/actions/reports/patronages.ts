import { JournalType } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface FilterProps {
  month: string;
  journalType?: JournalType;
  memberId: string;
  year: string;
}

export async function fetchMemberPatronages({ month, memberId, year = dayjs().year().toString(), journalType = 'cashReceipts' }: FilterProps) {
  /**
   * * Fetch the records for the previous 30 days when there is no given parameters in dateRange
   */

  let startDate: Date;
  let endDate: Date;

  if (month === undefined || month === 'All') {
    // If 'All' is selected, fetch for the whole year
    startDate = dayjs(`${year}-01`, 'YYYY-MM').startOf('year').toDate();
    endDate = dayjs(`${year}-12`, 'YYYY-MM').endOf('year').toDate();
  } else {
    // Convert month value to string with leading zero if necessary
    const monthStr = String(month).padStart(2, '0');
    startDate = dayjs(`${year}-${monthStr}`, 'YYYY-MM').startOf('month').toDate();
    endDate = dayjs(`${year}-${monthStr}`, 'YYYY-MM').endOf('month').toDate();
  }

  const accountLedgers = await prisma.journalItems.groupBy({
    by: ['accountId'],
    _sum: { debit: true, credit: true },
    where: {
      JournalEntries: {
        entryDate: { gte: startDate, lt: endDate },
        journalType: journalType,
        memberId: memberId,
      },
      Accounts: {
        RootID: {
          /**
           * * Only assets and Revenue accounts are relevant to patronages
           */
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
