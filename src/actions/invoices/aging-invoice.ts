import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

const today = dayjs();

const interestRate = 2;

export type MembersMap = {
  [memberId: string]: {
    memberId: string;
    fullName: string;
    agingItems: {
      invoiceItemId: bigint;
      itemName: string;
      dateOfInvoice: Date;
      payments: { amountPaid: number }[];
      monthOverdue: number;
      accruedInterest: number;
      totalPrincipalAndTrade: number;
      quantity: number;
    }[];
  };
};

export async function fetchAgingInvoiceItemsPerMember() {
  const agingInvoiceItems = await prisma.invoiceItems.findMany({
    where: {
      isTotallyPaid: false,
      Invoice: {
        dateOfInvoice: {
          lte: today.subtract(1, 'month').toDate(),
        },
      },
    },
    include: {
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
      Item: true,
      ItemPayment: true,
    },
  });

  const mappedAgingInvoiceToMembers: MembersMap = {};

  for (const item of agingInvoiceItems) {
    const member = item.Invoice.Members;
    if (!member) continue;

    const memberId = member.memberId;
    const fullName = `${member.lastName}, ${member.firstName} ${member.middleName ?? ''}`.trim();

    const monthOverdue = dayjs().diff(item.Invoice.dateOfInvoice, 'month');

    const totalPrincipalAndTrade = (item.principalPrice + item.trade) * item.quantity;

    /**
     * * For computing the accrued interest
     */
    const totalPayments = item.ItemPayment.reduce(
      (acc, curr) => acc + curr.principalPaid.plus(curr.tradingPaid).toNumber(),
      0
    );

    const accruedInterest =
      monthOverdue > 0
        ? (((item.principalPrice + item.trade) * item.quantity - totalPayments) * interestRate * monthOverdue) / 100
        : 0;

    if (!mappedAgingInvoiceToMembers[memberId]) {
      mappedAgingInvoiceToMembers[memberId] = {
        memberId,
        fullName,
        agingItems: [],
      };
    }

    mappedAgingInvoiceToMembers[memberId].agingItems.push({
      invoiceItemId: item.invoiceItemId,
      itemName: item.Item?.itemName ?? 'Unknown',
      dateOfInvoice: item.Invoice.dateOfInvoice,
      payments: item.ItemPayment.map((p) => ({
        amountPaid: p.principalPaid.plus(p.tradingPaid).toNumber(),
      })),
      monthOverdue,
      accruedInterest,
      totalPrincipalAndTrade,
      quantity: item.quantity,
    });
  }

// Sort the members by fullName and return as original object
  const sortedMembers = Object.values(mappedAgingInvoiceToMembers).sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );

  const sortedMappedAgingInvoiceToMembers: MembersMap = {};
  for (const member of sortedMembers) {
    sortedMappedAgingInvoiceToMembers[member.memberId] = member;
  }

  return sortedMappedAgingInvoiceToMembers;
}
