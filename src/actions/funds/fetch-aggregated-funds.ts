import prisma from '@/lib/prisma';

export async function fetchAggregatedFunds() {
  const aggregatedFunds = await prisma.memberFunds.aggregate({
    _sum: {
      savingsBal: true,
      shareCapBal: true,
    },
  _count : {
    fundId : true
  }
  });
  return aggregatedFunds;
}
