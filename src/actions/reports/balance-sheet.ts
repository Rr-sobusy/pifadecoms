import type { AccountTypes } from '@prisma/client';

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

export async function getBalanceSheet(): Promise<BalanceSheet> {
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
          AND: {
            isActive: true,
            runningBalance: {
              not: 0,
            },
          },
        },
        select: {
          accountName: true,
          runningBalance: true,
        },
      },
    },
  });

  console.log(accounts);

  accounts.forEach((account) => {
    const category = account.rootType as Exclude<AccountTypes, 'Expense' | 'Revenue'>;

    const totalBalance = account.Children.reduce((sum, child) => sum + Number(child.runningBalance), 0);

    if (totalBalance !== 0) {
      // Append 'Contra_Assets' children to 'Assets'
      if (category === 'Contra_Assets') {
        console.log('contra found');
        balanceSheet.Assets.push({
          parentAccount: account.rootName,
          totalBalance,
          isContra: true,
          children: account.Children.map((child) => ({
            accountName: child.accountName,
            balance: Number(child.runningBalance),
          })),
        });
      } else {
        balanceSheet[category].push({
          parentAccount: account.rootName,
          totalBalance,
          isContra: false,
          children: account.Children.map((child) => ({
            accountName: child.accountName,
            balance: Number(child.runningBalance),
          })),
        });
      }
    }
  });

  return balanceSheet;
}
