import type { AccountTypes } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface ChildAccount {
  accountName: string;
  balance: number;
}

interface ParentAccount {
  parentAccount: string;
  isContra: boolean;
  totalBalance: number;
  children: ChildAccount[];
}

type BalanceSheet = Record<Exclude<AccountTypes, 'Expense' | 'Revenue' | 'Contra_Assets'>, ParentAccount[]>;

export async function getBalanceSheet(asOf: Date = new Date()): Promise<BalanceSheet> {
  const balanceSheet: BalanceSheet = {
    Assets: [],
    Liability: [],
    Equity: [],
  };

  const accounts = await prisma.accountsSecondLvl.findMany({
    where: {
      OR: [{ rootType: 'Assets' }, { rootType: 'Equity' }, { rootType: 'Liability' }, { rootType: 'Contra_Assets' }],
    },
    include: {
      Children: {
        where: {
          isActive: true,
        },
        select: {
          accountName: true,
          accountId: true,
          runningBalance: true, // Needed for journal lookup
        },
      },
    },
  });

  for (const account of accounts) {
    const category = account.rootType as Exclude<AccountTypes, 'Expense' | 'Revenue'>;

    // Fetch sum of journal entries that occurred **after** `asOf`
    const childBalances = await Promise.all(
      account.Children.map(async (child) => {
        const futureBalance = await prisma.journalItems.aggregate({
          where: {
            accountId: child.accountId,
            JournalEntries: {
              entryDate: {
                gt: dayjs(asOf).endOf('day').toISOString(), // Only look at transactions after `asOf`
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
          account.rootType === 'Assets'
            ? Number(child.runningBalance) -
              (Number(futureBalance._sum.debit) || 0) -
              (Number(futureBalance._sum.credit) || 0)
            : Number(child.runningBalance) -
              (Number(futureBalance._sum.credit) || 0) -
              (Number(futureBalance._sum.debit) || 0);

        return computedBalance !== 0 ? { accountName: child.accountName, balance: computedBalance } : null;
      })
    );

    // Filter out accounts with zero balances
    const childrenWithBalances = childBalances.filter((child): child is ChildAccount => child !== null);

    const totalBalance = childrenWithBalances.reduce((sum, child) => sum + child.balance, 0);

    if (totalBalance !== 0) {
      // Append 'Contra_Assets' to 'Assets'
      if (category === 'Contra_Assets') {
        balanceSheet.Assets.push({
          parentAccount: account.rootName,
          totalBalance,
          isContra: true,
          children: childrenWithBalances,
        });
      } else {
        balanceSheet[category].push({
          parentAccount: account.rootName,
          totalBalance,
          isContra: false,
          children: childrenWithBalances,
        });
      }
    }
  }

  return balanceSheet;
}
