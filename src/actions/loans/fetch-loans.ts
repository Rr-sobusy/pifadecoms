import prisma from '@/lib/prisma';

export async function fetchLoans() {
  const loanList = await prisma.memberLoans.findMany({
    take: 1000,
  });

  return loanList;
}
