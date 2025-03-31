import prisma from '@/lib/prisma';

export async function fetchReceivedPayments() {
  const payments = await prisma.invoiceItemsPayments.findMany({
    include: {
      JournalEntry: {
        include: {
          Members: {
            select: {
              lastName: true,
              firstName: true,
              middleName: true,
            },
          },
        },
      },
      InvoiceItem: {
        include: {
          Invoice: {
            include: {
              Members: {
                select: {
                  lastName: true,
                  firstName: true,
                  middleName: true,
                },
              },
            },
          },
          Item: {
            select: {
              itemName: true,
            },
          },
        },
      },
    },
  });

  return payments;
}
