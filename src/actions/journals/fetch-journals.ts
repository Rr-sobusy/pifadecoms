import prisma from '@/lib/prisma';

export async function fetchJournals() {
  const journals = await prisma.journalEntries.findMany({
    include: {
      JournalItems: true,
    },
    where: {
      referenceType: 'ManualJournals',
    },
  });

  return journals;
}
