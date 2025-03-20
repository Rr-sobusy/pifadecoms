import prisma from '@/lib/prisma';

export async function fetchJournals(page: number = 1) {
  const skips = (page - 1) * 100;

  const journals = await prisma.journalEntries.findMany({
    include: {
      JournalItems: true,
      Members: true,
    },
    where: {
      referenceType: 'ManualJournals',
    },
    orderBy: {
      entryDate: 'desc',
    },
    take: 100,
    skip: skips,
  });

  return journals;
}
