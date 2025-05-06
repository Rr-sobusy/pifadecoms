import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

export async function fetchTopMovingItemInLast30Days() {
  const thirtyDaysAgo = dayjs().subtract(30, 'day').toDate();

  const bestItems: { itemName: string; quantityPurchased: number }[] = [];

  const bestMovingItems = await prisma.invoiceItems.groupBy({
    by: ['itemID'],
    where: {
      Invoice: {
        dateOfInvoice: {
          gte: thirtyDaysAgo,
        },
      },
    },
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 6,
  });

  const _items = await prisma.items.findMany({});

  bestMovingItems.forEach((items, index) => {
    bestItems[0] = {
      itemName: _items.find((val) => val.itemID === items.itemID)?.itemName ?? '',
      quantityPurchased: items._sum.quantity || 0,
    };
  });

  return bestItems;
}
