import prisma from '@/lib/prisma';

interface Filterers {
  memberId?: string;
  loanId?: number;
  status?: 'Active' | 'Closed' | 'All';
  sourceId?: number;
  contractType?: 'StraightPayment' | 'Diminishing' | 'OneTime';
  releasedDateFrom?: Date;
  releasedDateTo?: Date;
  dueDate?: Date | string;
  cursor?: string;
}

export async function fetchLoans(props: Filterers = {}) {
  // const isEmpty = !props.memberId && !props.loanId;

  const conditions = [];

  if (props.loanId) {
    conditions.push({ loanId: props.loanId });
  }

  if (props.memberId) {
    conditions.push({ memberId: props.memberId });
  }

  if (props.status && props.status !== 'All') {
    conditions.push({ loanStatus: props.status });
  }

  if (props.sourceId) {
    conditions.push({ sourceId: Number(props.sourceId) });
  }

  if (props.contractType) {
    conditions.push({ repStyle: props.contractType });
  }

  if(props.releasedDateFrom && props.releasedDateTo) {
    conditions.push({
      issueDate: {
        gte: new Date(props.releasedDateFrom),
        lte: new Date(props.releasedDateTo),
      },
    })
  }

  if (props.dueDate) {
    conditions.push({
      dueDate: {
        lte: new Date(props.dueDate),
      },
    });
  }

  const loanList = await prisma.memberLoans.findMany({
    include: {
      Member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
      Repayments: {
        include: {
          JournalEntries: {
            select: {
              referenceName: true,
            },
          },
        },
      },
    },
    where: conditions.length > 0 ? { AND: conditions } : undefined,
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
