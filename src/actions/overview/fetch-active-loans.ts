import prisma from '@/lib/prisma';

export async function fetchActiveLoans() {
  const activeLoans = await prisma.memberLoans.findMany({
    where: {
      loanStatus: 'Active',
    },
  });

  return activeLoans.length;
}
