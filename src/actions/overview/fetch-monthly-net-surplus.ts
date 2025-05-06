import dayjs from 'dayjs';

import prisma from '@/lib/prisma';

export async function fetchMonthlyNetSurplus() {
  const startOfYear = dayjs().startOf('year').toDate();
  const endOfYear = dayjs().endOf('year').toDate();

  const journalItems = await prisma.journalItems.findMany({
    where: {
      JournalEntries: {
        entryDate: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      Accounts: {
        RootID: {
          rootType: {
            in: ['Revenue', 'Expense'],
          },
        },
      },
    },
    include: {
      JournalEntries: true,
      Accounts: {
        include: {
          RootID: true,
        },
      },
    },
  });

  // Step 2: Aggregate per month
  const monthlyMap = new Map<string, { Revenue: number; Expense: number }>();

  for (let i = 0; i < 12; i++) {
    const monthKey = dayjs().month(i).format('MMM');
    monthlyMap.set(monthKey, { Revenue: 0, Expense: 0 });
  }

  for (const item of journalItems) {
    const month = dayjs(item.JournalEntries.entryDate).format('MMM');
    const type = item.Accounts.RootID.rootType;

    const entry = monthlyMap.get(month)!;

    const debit = Number(item.debit);
    const credit = Number(item.credit);

    if (type === 'Revenue') {
      entry.Revenue += credit - debit;
    } else if (type === 'Expense') {
      entry.Expense += debit - credit;
    }
  }

  // Step 3: Accumulate net surplus
  let accumulated = 0;
  const result: { month: string; netSurplus: number }[] = [];

  Array.from(monthlyMap.entries()).forEach(([month, { Revenue, Expense }]) => {
    const net = Revenue - Expense;
    accumulated += net;
    result.push({ month, netSurplus: accumulated });
  });

  return result;
}
