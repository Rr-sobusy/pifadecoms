import { RepaymentStyle } from '@prisma/client';

import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

const today = dayjs().toDate();

export type AgingLoanMap = {
  [memberId: string]: {
    memberId: string;
    fullName: string;
    agingLoans: {
      loanId: bigint;
      repaymentStyle: RepaymentStyle;
      sourceName: string;
      releaseDate: Date;
      dueDate: Date;
      amountToPay: number;
      lapseFromLastPaymentToDueDate: number | null;
      lapseFromDueDateToToday: number | null;

      repayments: {
        paymentSched: Date;
        paymentDate: Date;
        principal: number;
        interest: number;
      }[];
    }[];
  };
};

export async function fetchAgingLoanPerMember(): Promise<AgingLoanMap> {
  const agingLoans = await prisma.memberLoans.findMany({
    where: {
      loanStatus: 'Active',
      dueDate: {
        lte: today,
      },
    },
    include: {
      Member: true,
      Source: {
        select: {
          sourceName: true,
        },
      },
      Repayments: {
        orderBy: {
          paymentDate: 'asc',
        },
      },
    },
  });

  const result: AgingLoanMap = {};

  for (const loan of agingLoans) {
    const { memberId, lastName, firstName, middleName } = loan.Member;
    const entry = result[memberId] ?? {
      memberId,
      fullName: `${lastName}, ${firstName} ${middleName || ''}`,
      agingLoans: [],
    };

    // Get last payment date, if any
    const lastPayment = loan.Repayments.at(-1);
    const lastPaymentDate = lastPayment ? dayjs(lastPayment.paymentDate) : null;

    const dueDate = dayjs(loan.dueDate);

    const lapseFromLastPaymentToDueDate = lastPaymentDate ? dueDate.diff(lastPaymentDate, 'month') : null;

    const lapseFromDueDateToToday = today ? dayjs(today).diff(dueDate, 'month') : null;

    entry.agingLoans.push({
      loanId: loan.loanId,
      sourceName: loan.Source?.sourceName ?? 'Unknown',
      releaseDate: loan.issueDate,
      dueDate: loan.dueDate,
      repaymentStyle: loan.repStyle,
      amountToPay: Number(loan.amountPayable),
      lapseFromLastPaymentToDueDate,
      lapseFromDueDateToToday,

      repayments: loan.Repayments.map((payment) => ({
        paymentSched: dayjs(payment.paymentDate).toDate(),
        paymentDate: dayjs(payment.paymentDate).toDate(),
        principal: Number(payment.principal),
        interest: Number(payment.interest),
      })),
    });

    result[memberId] = entry;
  }

  const sortedObject = Object.values(result).sort((a, b) => a.fullName.localeCompare(b.fullName));

  const sortedArray: AgingLoanMap = {};
  for (const member of sortedObject) {
    sortedArray[member.memberId] = member;
  }

  return sortedArray;
}
