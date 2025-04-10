import prisma from '@/lib/prisma';

export async function fetchFundTransactions(fundId: number) {
  const fundTransactions = await prisma.memberFunds.findUnique({
    where: {
      fundId: fundId,
    },
    include: {
      Transactions: {
        include: {
          JournalEntries: true,
        },
        orderBy: {
          JournalEntries : {
            entryDate: 'desc',
          }
        },
      },
      Member: true,
    },
  });

  return fundTransactions;
}
