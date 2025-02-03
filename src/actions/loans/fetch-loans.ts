import prisma from '@/lib/prisma';

export async function fetchLoans() {
  const loanList = await prisma.memberLoans.findMany({
    include: {
      Repayments: {
        where: {
          paymentDate: {
            not: null,
          },
        },
      },
      Member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const loans = loanList.map((loan) => {
    const totalPayment = loan.Repayments.reduce((curr, acc) => curr + Number(acc.principal) + Number(acc.interest), 0);

    return {
      ...loan,
      totalPayment,
    };
  });

  return loans;
}

export async function fetchLoanDetails(loanId: bigint) {
  const loanDetails = await prisma.memberLoans.findUnique({
    where: {
      loanId: loanId,
    },
  });

  return loanDetails
}
