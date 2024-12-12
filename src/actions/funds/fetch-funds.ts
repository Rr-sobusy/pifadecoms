import prisma from '@/lib/prisma';

export async function fetchMemberFunds() {
  const memberFunds = await prisma.memberFunds.findMany({
    include: {
      Member: true,
      Transactions: {
        include: {
          JournalEntries : true
        },
      },
    },
  });
  return memberFunds;
}


