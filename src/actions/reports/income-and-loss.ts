import { AccountTypes } from '@prisma/client';

import prisma from '@/lib/prisma';

interface ChildProps {
  accountName: string;
  balance: number;
}

type IncomeAndLossShape = Record<
  Exclude<AccountTypes, 'Assets' | 'Liability' | 'Contra_Assets' | 'Equity'>,
  ChildProps[]
>;

export async function fetchIncomeAndLossReport() {
  const incomeAndLossReport: IncomeAndLossShape = {
    Expense: [],
    Revenue: [],
  };

  const transactions = await prisma.journalItems.groupBy({
    by: ['accountId'],
    _sum: { debit: true, credit: true },
    where: {
      JournalEntries: {
        entryDate: {
          gte: new Date('2024-01-01'),
          lte: new Date('2024-12-31'),
        },
      },
      Accounts: {
        RootID: {
          rootType: {
            in: ['Expense', 'Revenue'],
          },
        },
      },
    },
  });

  const accountId = transactions.map((transaction) => transaction.accountId);

  const chartOfAccounts = await prisma.accountsThirdLvl.findMany({
    where: {
      accountId: {
        in: [...accountId],
      },
    },
    select: {
      accountId: true,
      accountName: true,
      runningBalance: true,

      RootID: {
        select: {
          rootType: true,
        },
      },
    },
  });

  const accountMap = new Map(chartOfAccounts.map((acc) => [acc.accountId, acc]));

  transactions.forEach((ledger) => {
    const account = accountMap.get(ledger.accountId);
    if (!account) return;

    const balance =
      account.RootID.rootType === 'Revenue'
        ? Number(ledger._sum.credit) - Number(ledger._sum.debit)
        : Number(ledger._sum.debit) - Number(ledger._sum.credit);

    incomeAndLossReport[
      account.RootID.rootType as Exclude<AccountTypes, 'Assets' | 'Liability' | 'Contra_Assets' | 'Equity'>
    ].push({
      accountName: account.accountName,
      balance,
    });
  });

  return incomeAndLossReport;
}
