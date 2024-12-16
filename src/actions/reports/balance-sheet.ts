import prisma from '@/lib/prisma';
import type { AccountTypes } from '@prisma/client';


interface ChildAccount {
  accountName: string;
  balance: number;
}

interface ParentAccount {
  parentAccount: string;
  totalBalance: number;
  children: ChildAccount[];
}



type BalanceSheet = Record<Exclude<AccountTypes, 'Expense'| 'Revenue'>, ParentAccount[]>;

const balanceSheet: BalanceSheet = {
  Assets: [],
  Liability: [],
  Equity: [],
};

export async function getBalanceSheet() {
  const accounts = await prisma.accountsSecondLvl.findMany({
    where : {
    OR : [{rootType : "Assets"}, {rootType : "Equity"}, {rootType : "Liability"}]
    },
    include: {
      Children: {
        where: { isActive: true },
        select: {
          accountName: true,
          runningBalance: true,
        },
      },
    },
    orderBy: {
      rootType: 'asc',
    },
  });

  accounts.forEach(account => {
    const category = account.rootType as Exclude<AccountTypes, 'Expense'| 'Revenue'>; // Narrow the type

    const totalBalance = account.Children.reduce(
      (sum, child) => sum + child.runningBalance,
      0
    );

    if (totalBalance !== 0) {
      balanceSheet[category].push({
        parentAccount: account.rootName,
        totalBalance,
        children: account.Children.map(child => ({
          accountName: child.accountName,
          balance: child.runningBalance,
        })),
      });
    }
  });

  return balanceSheet;
}

// Example usage

