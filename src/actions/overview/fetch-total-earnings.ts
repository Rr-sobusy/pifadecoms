import prisma from '@/lib/prisma';

type RevenueExpenseSummed = {
  Revenue: number;
  Expense: number;
};

export async function fetchTotalEarnings() {
  const currents: RevenueExpenseSummed = {
    Expense: 0,
    Revenue: 0,
  };

  const incomeAndRevenueAccounts = await prisma.accountsThirdLvl.findMany({
    include: {
      RootID: true,
    },
    where: {
      RootID: {
        OR: [
          {
            rootType: 'Revenue',
          },
          {
            rootType: 'Expense',
          },
        ],
      },
    },
  });

  for (const account of incomeAndRevenueAccounts) {
    const balance = Number(account.runningBalance);

    if (account.RootID.rootType === 'Revenue') {
      currents.Revenue += balance;
    } else if (account.RootID.rootType === 'Expense') {
      currents.Expense += balance;
    }
  }

  return currents;
}
