import prisma from '@/lib/prisma';

export async function fetchLoanSources() {
  const loanSources = await prisma.loanSource.findMany({});
  return loanSources;
}
