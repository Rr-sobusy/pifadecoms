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
  cursor?: string;
}

export async function fetchInvoices(props: Filterers = {}) {
  const isEmpty = !props.memberId && !props.invoiceId && !props.startDate && !props.endDate;

  const cursorValue = props.cursor ? Number(props.cursor) : undefined;

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

  const invoices = await prisma.invoice.findMany({
    include: {
      InvoiceItems: {
        include: {
          Item: true,
          ItemPayment: true,
        },
      },
      Members: true,
    },
    cursor: cursorValue ? { invoiceId: cursorValue } : undefined,
    skip: props.cursor ? 1 : 0,
    take: 151,
    orderBy: {
      invoiceId: 'desc',
    },
    /**
     * * Create nullish operator to return the original lists if paramaters are not supplied.
     */
    where: isEmpty
      ? undefined
      : {
          OR: conditions,
        },
  });
  const hasMore = invoices.length === 151;
  const nextCursor = hasMore ? invoices[150].invoiceId : undefined; // Only set nextCursor if there are more than 150 records
  console.log(nextCursor);
  return { nextCursor, invoice: invoices.slice(0, 151) };
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
