/**
 * * Fetch expenses by using custom filters in Journal Entries. I think creating new separate table for expenses is not
 * * really a used case.
 */
import prisma from '@/lib/prisma';

export async function fetchExpenses() {
  const runningExpenses = await prisma.journalEntries.findMany({
    where: {
      OR: [
        {
          referenceType: 'OtherExpenses',
        },
        {
          referenceType: 'VendorPurchases',
        },
      ],
    },
    include : {
        JournalItems : {
            include : {
                Accounts : true
            }
        }
    }
  });

  return runningExpenses;
}
