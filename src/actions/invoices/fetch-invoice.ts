/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  invoiceId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}

export async function fetchInvoices(props: Filterers = {}) {
  const isEmpty = !props.memberId && !props.invoiceId && !props.startDate && !props.endDate && !props.status;

  const conditions = [];

  if (props.memberId) {
    conditions.push({ memberId: props.memberId });
  }

  if (props.invoiceId) {
    conditions.push({ invoiceId: props.invoiceId });
  }

  if (props.startDate || props.endDate) {
    conditions.push({
      dateOfInvoice: {
        ...(props.startDate && { gte: dayjs(props.startDate).startOf('day').toISOString() }),
        ...(props.endDate && { lte: dayjs(props.endDate).endOf('day').toISOString() }),
      },
    });
  }

  const invoice = await prisma.invoice.findMany({
    include: {
      InvoiceItems: {
        include: {
          Item: true,

          ItemPayment: true,
        },
      },
      Members: true,
    },
    // cursor : {
    //     invoiceId : 1
    // },
    /**
     * * Create nullish operator to return the original lists if paramaters are not supplied.
     */
    where: isEmpty
      ? undefined
      : {
          OR: conditions,
        },
  });

  return invoice;
}

export async function fetchSingleInvoice(invoiceId: bigint) {
  const invoiceDetails = await prisma.invoice.findUnique({
    where: {
      invoiceId: invoiceId,
    },
    include: {
      InvoiceItems: {
        include: {
          Item: true,

          ItemPayment: true,
        },
      },
      Members: true,
    },
  });

  return invoiceDetails;
}

export async function fetchInvoiceItemPerMember(memberId?: string, sourceName?: number) {
  const invoiceItems = await prisma.invoiceItems.findMany({
    where: {
      Invoice: {
        memberId: memberId,
      },
      Item: {
        ItemSource: {
          sourceId: sourceName ? sourceName : undefined,
        },
      },
    },
    orderBy: [{ Invoice: { dateOfInvoice: 'desc' } }, { Invoice: { invoiceId: 'desc' } }],
    include: {
      ItemPayment: {
        include: {
          JournalEntry: true,
        },
      },
      Invoice: {
        include: {
          Members: {
            select: {
              memberId: true,
              lastName: true,
              firstName: true,
              middleName: true,
            },
          },
        },
      },
      Item: {
        include: {
          ItemSource: true,
        },
      },
    },
  });

  return memberId ? invoiceItems : [];
}
