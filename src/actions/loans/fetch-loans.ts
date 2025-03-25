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
        include: {
          JournalEntries: true,
        },
      },
      Member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
      JournalEntries: {
        select: {
          referenceName: true,
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
    include: {
      Member: {
        select: {
          memberId: true,
          lastName: true,
          firstName: true,
        },
      },
      Repayments: {
        orderBy: {
          paymentSched: 'asc',
        },
        include: {
          JournalEntries: {
            select: {
              referenceName: true,
            },
          },
        },
      },
      JournalEntries: true,
      Source: true,
    },
  });

  if (!loanDetails || Object.keys(loanDetails).length === 0) {
    throw new Error('No loan record found!');
  }

  return loanDetails;
}
