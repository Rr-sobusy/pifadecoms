// import { dayjs } from '@/lib/dayjs';
// import { MemberFundsType } from '@/actions/funds/types';

// export const computeMonthlyBalances = (
//   transactions: MemberFundsType[0],
//   year: 2024 | 2025 | 2026 | 2027 | 2028 | 2029
// ): { month: string; balance: number }[] => {
//   const months = Array.from({ length: 12 }, (_, i) => ({
//     month: i + 1,
//     balance: 0,
//   }));

//   const transactionsList = transactions.Transactions || [];

//   const yearTransactions = transactionsList.filter((transaction) => {
//     const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
//     return transactionDate.isValid() && transactionDate.year() === year && transaction.fundType === 'Savings';
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
import {dayjs} from '@/lib/dayjs';
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
  
  // Filter transactions for the given year and fund type "Savings"
  const yearTransactions = transactionsList.filter((transaction) => {
    const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
    return (
      transactionDate.isValid() &&
      transactionDate.year() === year &&
      transaction.fundType === fundType
    );
  });

  // Sort transactions by date to process them in order
  yearTransactions.sort((a, b) =>
    dayjs(a.JournalEntries?.entryDate).diff(dayjs(b.JournalEntries?.entryDate))
  );

  let runningBalance = fundType === 'Savings' ? transactions.savingsBal || 0 : transactions.shareCapBal || 0;
  const dailyBalances: Record<string, number> = {};

  // Fill dailyBalances with transaction balances
  yearTransactions.forEach((transaction) => {
    const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
    const dateKey = transactionDate.format('YYYY-MM-DD');

    runningBalance = Number(transaction.newBalance); // Update balance
    dailyBalances[dateKey] = runningBalance;
  });

  // Iterate through each month and compute daily running balances
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
    let monthlyBalance = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Carry forward the previous day's balance if no new transaction is recorded
      if (dailyBalances[dateKey] !== undefined) {
        runningBalance = dailyBalances[dateKey];
      }
      
      monthlyBalance += runningBalance;
    }

    months[month - 1].totalBalance = monthlyBalance;
    months[month - 1].daysCount = daysInMonth;
  }

  return months.map(({ month, totalBalance, daysCount }) => ({
    month: dayjs().month(month - 1).format('MMMM'),
    balance: daysCount > 0 ? totalBalance / daysCount : 0,
  }));
};
