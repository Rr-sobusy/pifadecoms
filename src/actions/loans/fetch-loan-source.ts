import prisma from '@/lib/prisma';

export async function fetchLoanSources() {
  const loanSources = await prisma.loanSource.findMany({
    include: {
      DefaultAccount: {
        select: {
          accountName: true,
        },
      },
      Loans: {
        where: {
          loanStatus: 'Active',
        },
        include: {
          Repayments: {
            select: {
              principal: true,
              interest: true,
            },
          },
        },
      },
    },
    orderBy : {
      sourceName : 'asc'
    }
  });

  const receivableFromActiveLoans = loanSources.map((source) => {
    const totalReceivable = source.Loans.reduce((sum, loan) => {
      // Calculate total payments made
      const totalPaid = loan.Repayments.reduce((paymentSum, repayment) => {
        return paymentSum + (Number(repayment.interest) || 0) + (Number(repayment.interest) || 0);
      }, 0);

      // Calculate remaining balance on the loan
      const remainingBalance = (Number(loan.amountPayable) || 0) - totalPaid;

      return sum + (remainingBalance > 0 ? remainingBalance : 0);
    }, 0);

    return {
      loanSourceId: source.sourceId,
      loanSourceName: source.sourceName,
      accountName: source.DefaultAccount?.accountName || null,
      totalReceivableAmt: totalReceivable,
    };
  });

  return receivableFromActiveLoans;
}
