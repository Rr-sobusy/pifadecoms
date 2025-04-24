import prisma from '@/lib/prisma';

export async function fetchLoans() {
  const loanList = await prisma.memberLoans.findMany({
    include: {
      Member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
      Repayments : {
        include : {
          JournalEntries: {
            select: {
              referenceName: true,
            },
          },
        }
      },
    },
  });

  return loanList;
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
