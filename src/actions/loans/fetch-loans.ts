import prisma from '@/lib/prisma';

export async function fetchLoans() {
  const loanList = await prisma.memberLoans.findMany({
    include: {
      Repayments: true,
      Member : {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      }
    },
  });

  return loanList;
}
