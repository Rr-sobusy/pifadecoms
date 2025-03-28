import { AccountTypes } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface ParentAccountProps {
  parentAccount: string;
  totalBalance: number;
  children: ChildAccountProps[];
}

interface ChildAccountProps {
  parentAccount: string;
  balance: number;
  accountName: string;
}

type IncomeAndLossShape = Record<
  Exclude<AccountTypes, 'Assets' | 'Liability' | 'Contra_Assets' | 'Equity'>,
  ParentAccountProps[]
>;

export async function fetchIncomeAndLossReport({
  startDate,
  endDate,
}: {
  startDate?: Date | string;
  endDate?: Date | string;
}): Promise<IncomeAndLossShape> {
  const incomeAndLossReport: IncomeAndLossShape = {
    Revenue: [],
    Expense: [],
  };

  const accounts = await prisma.accountsSecondLvl.findMany({
    where: {
      OR: [{ rootType: 'Revenue' }, { rootType: 'Expense' }],
    },
    include: {
      Children: {
        where: {
          isActive: true,
        },
        select: {
          accountName: true,
          accountId: true,
          runningBalance: true,
        },
        orderBy: {
          accountName: 'asc',
        },
      },
    },
  });

  for (const account of accounts) {
    const category = account.rootType as Exclude<AccountTypes, 'Assets' | 'Liability' | 'Contra_Assets' | 'Equity'>;

    // Fetch sum of journal entries that occurred **after** `asOf`
    const childBalances = await Promise.all(
      account.Children.map(async (child) => {
        const futureBalance = await prisma.journalItems.aggregate({
          where: {
            accountId: child.accountId,
            JournalEntries: {
              entryDate: {
                gte: dayjs(startDate).startOf('day').toISOString(),
                lte: dayjs(endDate).endOf('day').toISOString(),
              },
            },
          },
          _sum: {
            debit: true,
            credit: true,
          },
        });

        // Subtract future transactions from the running balance
        const computedBalance =
          account.rootType === 'Expense'
            ? (Number(futureBalance._sum.debit) || 0) - (Number(futureBalance._sum.credit) || 0)
            : (Number(futureBalance._sum.credit) || 0) - (Number(futureBalance._sum.debit) || 0);

        return computedBalance !== 0 ? { accountName: child.accountName, balance: computedBalance } : null;
      })
    );

    // Filter out accounts with zero balances
    const childrenWithBalances = childBalances.filter((child): child is ChildAccountProps => child !== null);

    const totalBalance = childrenWithBalances.reduce((sum, child) => sum + child.balance, 0);

    if (totalBalance !== 0) {
      // Append 'Contra_Assets' to 'Assets'
      if (category === 'Revenue') {
        incomeAndLossReport.Revenue.push({
          parentAccount: account.rootName,
          totalBalance,
          children: childrenWithBalances,
        });
      } else {
        incomeAndLossReport[category].push({
          parentAccount: account.rootName,
          totalBalance,
          children: childrenWithBalances,
        });
      }
    }
  }

  return incomeAndLossReport;
}
