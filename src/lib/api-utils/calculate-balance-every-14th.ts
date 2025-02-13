import { dayjs } from '@/lib/dayjs';
import { MemberFundsType } from '@/actions/funds/types';

export const computeMonthlyBalances = (
  transactions: MemberFundsType[0],
  year: 2024 | 2025 | 2026
): { month: string; balance: number }[] => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    balance: 0,
  }));

  const transactionsList = transactions.Transactions || [];

  const yearTransactions = transactionsList.filter((transaction) => {
    const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
    return transactionDate.isValid() && transactionDate.year() === year && transaction.fundType === 'Savings';
  });

  const latestTransactionsByMonth = yearTransactions.reduce(
    (acc, transaction) => {
      const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
      const month = transactionDate.month() + 1;

      // Keep only the latest transaction for each month
      if (!acc[month] || transactionDate.isAfter(dayjs(acc[month].JournalEntries?.entryDate))) {
        acc[month] = transaction;
      }

      return acc;
    },
    {} as Record<number, (typeof yearTransactions)[0]>
  );

  let lastBalance =
    yearTransactions.length > 0
      ? Number(yearTransactions[yearTransactions.length - 1].newBalance) -
        yearTransactions[yearTransactions.length - 1].postedBalance
      : transactions.savingsBal || 0;

  months.forEach((monthData) => {
    const { month } = monthData;

    // Get the latest transaction for the current month, if any
    const latestTransaction = latestTransactionsByMonth[month];

    // Update the last balance if there's a transaction for this month
    if (latestTransaction) {
      lastBalance = Number(latestTransaction.newBalance);
    }

    // Assign the balance for the current month
    monthData.balance = lastBalance;
  });

  return months.map(({ month, balance }) => ({
    month: dayjs()
      .month(month - 1)
      .format('MMMM'),
    balance,
  }));
};
