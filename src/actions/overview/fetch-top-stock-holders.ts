import prisma from '@/lib/prisma';

export async function fetchTopStockHolders() {
  const topStockHolders = await prisma.memberFunds.findMany({
    orderBy: {
      shareCapBal: 'desc',
    },
    take: 12,
    include: {
      Member: {
        select: {
          firstName: true,
          lastName: true,
          middleName: true,
        },
      },
    },
  });

  const totalAssets = await prisma.accountsThirdLvl.findMany({
    where: {
      OR: [{ RootID: { rootType: 'Assets' } }, { RootID: { rootType: 'Contra_Assets' } }],
    },
    include: {
      RootID: true,
    },
  });

  let totals = { Assets: 0, Contra_Assets: 0 };

  for (const _totals of totalAssets) {
    if (_totals.RootID.rootType === 'Assets') {
      totals.Assets += Number(_totals.runningBalance);
    } else {
      totals.Contra_Assets += Number(_totals.runningBalance);
    }
  }

  const stocksMappedWithTheirSharePercent = topStockHolders.map((stocks) => ({
    ...stocks,
    sharePercent: (stocks.shareCapBal / (totals.Assets - totals.Contra_Assets)) * 100,
  }));

  return stocksMappedWithTheirSharePercent
}
