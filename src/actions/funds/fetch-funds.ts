import prisma from '@/lib/prisma';

export async function fetchMemberFunds(memberName?: string) {
  const memberFunds = await prisma.memberFunds.findMany({
    where: {
      OR: [
        {
          Member: {
            lastName: {
              contains: memberName,
              mode : "insensitive"
            },
          },
        },
        {
          Member: {
            firstName: {
              contains: memberName,
                mode : "insensitive"
            },
          },
        },
      ],
    },
    include: {
      Member: true,
      Transactions: {
        include: {
          JournalEntries: true,
        },
      },
    },
  });
  return memberFunds;
}
