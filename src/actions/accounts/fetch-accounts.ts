import prisma from '@/lib/prisma';

export async function fetchChartofAccounts() {
  const accounts = await prisma.accountsThirdLvl.findMany({
    include: {
      RootID: true,
    },
  });
  return accounts;
}

export async function fetchRootAccounts() {
  const rootAccounts = await prisma.accountsSecondLvl.findMany();
  return rootAccounts;
}

export async function fetchAccountTree() {
  const accountTree = await prisma.accountsSecondLvl.findMany({
    include: {
      Children: true,
    },
    where: {
      Children: {
        some: {},
      },
    },
  });

  return accountTree;
}
