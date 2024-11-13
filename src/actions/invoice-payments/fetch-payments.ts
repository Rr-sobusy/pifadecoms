import prisma from '@/lib/prisma';

export async function fetchReceivedPayments() {
  const payments = await prisma.invoicePayments.findMany({
    include: {
      Invoice: {
        include: {
          Members: true,
        },
      },
      JournalEntry: {
        include: {
          JournalItems: {
            include : {
                Accounts : true
            }
          }
        },
      },
    },
  });

  return payments;
}
