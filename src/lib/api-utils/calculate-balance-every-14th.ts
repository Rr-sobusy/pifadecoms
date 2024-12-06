import { dayjs } from '@/lib/dayjs';
import { MemberFundsType } from '@/actions/funds/types';

export const computeMonthlyBalances = (transactions: MemberFundsType[0], year: 2024 | 2025 | 2026) => {
  // Prepare months template
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    balance: 0,
  }));

  let lastBalance = 0;

  months.forEach((monthData) => {
    const { month } = monthData;

    // Find transactions in the current month
    const monthTransactions = transactions.Transactions.filter((transaction) => {
      const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
      return (
        transactionDate.year() === year && transactionDate.month() + 1 === month // dayjs months are 0-indexed
      );
    });

    if (monthTransactions.length > 0) {
      // Update balance to the latest transaction in the month
      lastBalance = monthTransactions[monthTransactions.length - 1].newBalance;
    }

    // Set balance for the month
    monthData.balance = !transactions.Transactions.length ? transactions.savingsBal : lastBalance;
  });

  return months.map(({ month, balance }) => ({
    month,
    balance,
  }));
};
