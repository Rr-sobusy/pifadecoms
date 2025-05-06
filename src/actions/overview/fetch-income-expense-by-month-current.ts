import { dayjs } from '@/lib/dayjs';
import prisma from '@/lib/prisma';

const startDate = dayjs().startOf('year').toDate();
const endDate = dayjs().endOf('year').toDate();

type AllowedRootTypes = 'Revenue' | 'Expense';

export async function fetchMonthlyIncomeAndExpense() {

  const allMonths: string[] = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));

  const transactions = await prisma.journalItems.findMany({
    where: {
      AND: [
        {
          JournalEntries: {
            entryDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
        {
          Accounts: {
            OR: [
              {
                RootID: {
                  rootType: 'Revenue',
                },
              },
              {
                RootID: {
                  rootType: 'Expense',
                },
              },
            ],
          },
        },
      ],
    },
    include: {
      JournalEntries: {
        select: {
          entryDate: true,
        },
      },
      Accounts: {
        include: {
          RootID: {
            select: {
              rootType: true,
            },
          },
        },
      },
    },
  });

  /**
   * * Map the recent transaction into aggregated records per month
   *
   */

  const monthlyTotals = transactions.reduce((acc: Record<string, Record<AllowedRootTypes, number>>, ctx) => {
    const monthKey = dayjs(ctx.JournalEntries.entryDate).format('MMM');
    const type = ctx.Accounts.RootID.rootType;

    if (type !== 'Revenue' && type !== 'Expense') {
      return acc;
    }

    if (!acc[monthKey]) {
      acc[monthKey] = { Revenue: 0, Expense: 0 };
    }

    const amount = type === 'Revenue' ? ctx.credit.minus(ctx.debit).toNumber() : ctx.debit.minus(ctx.credit).toNumber();

    acc[monthKey][type] += amount;

    return acc;
  }, {});
  const filledMonthlyTotals = allMonths.map((month) => ({
    month,
    Revenue: monthlyTotals[month]?.Revenue ?? 0,
    Expense: monthlyTotals[month]?.Expense ?? 0,
  }));

  return filledMonthlyTotals;
}
