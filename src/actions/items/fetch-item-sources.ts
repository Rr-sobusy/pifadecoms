import prisma from '@/lib/prisma';

export async function fetchItemSources() {
  const itemSources = await prisma.itemSource.findMany({
    include: {
      Accounts: {
        select: {
          accountName: true,
        },
      },
      Items: {
        include: {
          InvoiceItems: {
            include: {
              ItemPayment: true,
            },
            where: {
              isTotallyPaid: false,
            },
          },
        },
      },
    },
  });

  const aggregatedUnpaidItems = itemSources.map((source) => {
    const totalUnpaidAmt = source.Items.reduce((sum, item) => {
      const itemTotal = item.InvoiceItems.reduce((invoiceSum, invItem) => {
        // 1. Calculate total payment made
        const totalPaid = invItem.ItemPayment.reduce((paymentSum, payment) => {
          return paymentSum + (Number(payment.principalPaid) + Number(payment.tradingPaid) || 0);
        }, 0);

        // 2. Calculate remaining balance
        const totalPrice = (invItem.principalPrice || 0) + (invItem.trade || 0);
        const remainingBalance = totalPrice - totalPaid;

        // 3. Only add if there’s still a balance left
        return remainingBalance > 0 ? invoiceSum + remainingBalance : invoiceSum;
      }, 0);

      return sum + itemTotal;
    }, 0);

    return {
      itemSourceId: source.sourceId,
      itemSourceName: source.sourceName,
      accountName: source.Accounts?.accountName || null,
      totalUnpaidAmt,
    };
  });

  return aggregatedUnpaidItems;
}
