/**
 *  Initially, invoicing do not have directly impact the balances of any of the accounts in accordance
 *  of cash basis accounting. It will affect the balances when payment was settled
 */

import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  invoiceId?: number;
  startDate?: Dayjs;
  endDate?: Date;
  status?: string;
}

export async function fetchInvoices(props: Filterers = {}) {
  const isEmpty = !props.memberId && !props.invoiceId && !props.startDate && !props.endDate && !props.status;

  const invoice = await prisma.invoice.findMany({
    include: {
      InvoiceItems: {
        include: {
          Item: true,
        },
      },
      Members: true,
    },
    where: isEmpty
      ? undefined
      : {
          OR: [
            { memberId: props.memberId },
            { invoiceId: props.invoiceId },
            {
              dateOfInvoice: {
                lte: dayjs(props.endDate).endOf('day').toISOString(),
                gte: dayjs(props.startDate).startOf('day').toISOString(),
              },
            },
          ].filter(Boolean),
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
        },
      },
      Members: true,
    },
  });

  return invoiceDetails;
}
