import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

const today = dayjs();

export async function fetchAgingInvoiceItemsPerMember() {
  const agingInvoiceItems = await prisma.members.findMany({
    include: {
      invoice: {
        include: {
          InvoiceItems: {
            where: {
              isTotallyPaid: false,
              Invoice: {
                dateOfInvoice: {
                  lte: today.subtract(1, 'month').toDate(),
                },
              },
            },
          },
        },
      },
    },
  });

  return agingInvoiceItems
}
