/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

import prisma from '@/lib/prisma';

export async function fetchInvoices() {
  const invoice = await prisma.invoice.findMany({
    include: {
      InvoiceItems: {
        include: {
          Item: true,
        },
      },
      Members: true,
    },
  });

  return invoice;
}
