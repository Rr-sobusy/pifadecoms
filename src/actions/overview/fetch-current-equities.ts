import prisma from '@/lib/prisma';

export default async function fetchCurrentEquities() {
    
  const currentBalanceOfEquityAccounts = await prisma.accountsSecondLvl.findMany({
    where: {
      rootType: 'Equity',
    },
    include: {
      Children: {
        where: {
          NOT: {
            runningBalance: 0,
          },
        },
      },
    },
  });

  const totalEquityBalance = currentBalanceOfEquityAccounts.reduce((acc, ctx) => {
    const sumOfChildren = ctx.Children.reduce((sum, child) => {
      return sum + Number(child.runningBalance);
    }, 0);
    return acc + sumOfChildren;
  }, 0);

  return totalEquityBalance;
}
