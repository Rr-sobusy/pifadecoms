import prisma from '@/lib/prisma';

export async function fetchChartofAccounts() {
  const accounts = await prisma.accountsThirdLvl.findMany({
    include: {
      RootID: true,
    },
    orderBy: [
      {
        RootID: {
          rootType: 'asc',
        },
      },
      {
        accountName: 'asc',
      },
    ],
  });
  return accounts;
}

export async function fetchRootAccounts() {
  const rootAccounts = await prisma.accountsSecondLvl.findMany();
  return rootAccounts;
}

export async function fetchAccountTree(fetchAll: boolean = false) {
  const accountTree = await prisma.accountsSecondLvl.findMany({
    include: {
      Children: true,
    },
    where: fetchAll ? {} : { Children: { some: {} } },
  });

  return accountTree;
}
