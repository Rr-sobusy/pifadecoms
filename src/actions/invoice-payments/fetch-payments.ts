import prisma from '@/lib/prisma';

export async function fetchReceivedPayments(cursor?: string) {
  const cursorValue = cursor ? Number(cursor) : undefined;

  const payments = await prisma.invoiceItemsPayments.findMany({
    cursor: cursorValue ? { itemsPaymentId: cursorValue } : undefined,
    skip: cursor ? 1 : 0,
    take: 501,
    orderBy: {
      itemsPaymentId: 'desc',
    },
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

  const hasMore = payments.length === 501;
  const nextCursor = hasMore ? payments[500].itemsPaymentId : undefined;
  return { nextCursor, payment: payments.slice(0, 501) };
}
