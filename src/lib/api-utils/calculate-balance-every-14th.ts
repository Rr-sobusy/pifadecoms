// import { dayjs } from '@/lib/dayjs';
// import { MemberFundsType } from '@/actions/funds/types';

// export const computeMonthlyBalances = (
//   transactions: MemberFundsType[0],
//   year: 2024 | 2025 | 2026 | 2027 | 2028 | 2029,
//   fundType: 'Savings' | 'ShareCapital'
// ): { month: string; balance: number }[] => {
//   const months = Array.from({ length: 12 }, (_, i) => ({
//     month: i + 1,
//     balance: 0,
//     fundType
//   }));

//   const transactionsList = transactions.Transactions || [];

//   const yearTransactions = transactionsList.filter((transaction) => {
//     const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
//     return transactionDate.isValid() && transactionDate.year() === year && transaction.fundType === fundType;
//   });

//   const latestTransactionsByMonth = yearTransactions.reduce(
//     (acc, transaction) => {
//       const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
//       const month = transactionDate.month() + 1;

//       // Keep only the latest transaction for each month
//       if (!acc[month] || transactionDate.isAfter(dayjs(acc[month].JournalEntries?.entryDate))) {
//         acc[month] = transaction;
//       }

//       return acc;
//     },
//     {} as Record<number, (typeof yearTransactions)[0]>
//   );

//   let lastBalance =
//     yearTransactions.length > 0
//       ? Number(yearTransactions[yearTransactions.length - 1].newBalance) -
//         Number(yearTransactions[yearTransactions.length - 1].postedBalance)
//       : transactions.savingsBal || 0;

//   months.forEach((monthData) => {
//     const { month } = monthData;

//     // Get the latest transaction for the current month, if any
//     const latestTransaction = latestTransactionsByMonth[month];

//     // Update the last balance if there's a transaction for this month
//     if (latestTransaction) {
//       lastBalance = Number(latestTransaction.newBalance);
//     }

//     // Assign the balance for the current month
//     monthData.balance = lastBalance;
//   });

//   return months.map(({ month, balance }) => ({
//     month: dayjs()
//       .month(month - 1)
//       .format('MMMM'),
//     balance,
//   }));
// };

import { dayjs } from '@/lib/dayjs';
import { MemberFundsType } from '@/actions/funds/types';

type MonthlyBalance = {
  month: string;
  balance: number;
};

export const computeMonthlyBalances = (
  transactions: MemberFundsType[0],
  year: 2024 | 2025 | 2026 | 2027 | 2028 | 2029,
  fundType: 'Savings' | 'ShareCapital'
): MonthlyBalance[] => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    totalBalance: 0,
    daysCount: 0,
  }));

  const transactionsList = transactions.Transactions || [];

  // Filter transactions for the given year and fund type
  const yearTransactions = transactionsList
    .filter((transaction) => {
      const entryDate = transaction.JournalEntries?.entryDate;
      if (!entryDate) return false;

      const transactionDate = dayjs(entryDate);
      return transactionDate.isValid() && transactionDate.year() === year && transaction.fundType === fundType;
    })
    .sort((a, b) => dayjs(a.JournalEntries?.entryDate).diff(dayjs(b.JournalEntries?.entryDate)));

  // If no transactions, return zero balances
  if (yearTransactions.length === 0) {
    return months.map(({ month }) => ({
      month: dayjs()
        .month(month - 1)
        .format('MMMM'),
      balance: fundType === 'Savings' ? transactions.savingsBal || 0 : transactions.shareCapBal || 0,
    }));
  }

  // Get first transaction's balance as the initial balance
  let firstTransaction = yearTransactions[0];
  let firstTransactionDate = dayjs(firstTransaction.JournalEntries?.entryDate);
  let initialBalance =
    firstTransaction.transactionType === 'SavingsDeposit' || firstTransaction.transactionType === 'ShareCapDeposit'
      ? Number(firstTransaction.newBalance) - Number(firstTransaction.postedBalance)
      : Number(firstTransaction.newBalance) + Number(firstTransaction.postedBalance);
  let runningBalance = initialBalance;
  const dailyBalances: Record<string, number> = {};

  // Process transactions and update daily balances
  yearTransactions.forEach((transaction) => {
    const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
    const dateKey = transactionDate.format('YYYY-MM-DD');

    // The balance for a specific date should be the latest `newBalance` of the last transaction on that day
    runningBalance = Number(transaction.newBalance);
    dailyBalances[dateKey] = runningBalance;
  });

  // Fill missing days with the last known balance
  let lastKnownBalance = initialBalance;
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
    let monthlyBalance = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Before the first transaction, keep initial balance
      if (dayjs(dateKey).isBefore(firstTransactionDate, 'day')) {
        lastKnownBalance = initialBalance;
      }

      // After the transaction date, update balance normally
      if (dailyBalances[dateKey] !== undefined) {
        lastKnownBalance = dailyBalances[dateKey];
      }

      monthlyBalance += lastKnownBalance;
    }

    months[month - 1].totalBalance = monthlyBalance;
    months[month - 1].daysCount = daysInMonth;
  }

  // Compute average balance per month
  return months.map(({ month, totalBalance, daysCount }) => ({
    month: dayjs()
      .month(month - 1)
      .format('MMMM'),
    balance: daysCount > 0 ? totalBalance / daysCount : 0, // Average balance per day in the month
  }));
};
