// /**
//  * * This function is used to calculate averagae daily balance.
//  */
// import type { Dayjs } from 'dayjs';

// import { dayjs } from '@/lib/dayjs';
// import type { MemberFundsType } from '@/actions/funds/types';

// export function calculateADB(fundTransactions: MemberFundsType[0]['Transactions'], startDate: Dayjs, endDate: Dayjs, currentBalance:number) {
//   const start = dayjs(startDate);
//   const end = dayjs(endDate);

//   if (fundTransactions.length === 0) {
//     return currentBalance;
//   }

//   let totalDays = 0;
//   let weightedSum = 0;

//   for (let i = 0; i < fundTransactions.length; i++) {
//     const currentBalance = fundTransactions[i];
//     const nextDate = fundTransactions[i + 1]
//       ? dayjs(fundTransactions[i + 1].JournalEntries?.entryDate)
//       : end.add(1, 'day'); // Use the end date if it's the last entry

//     const validFrom = dayjs(currentBalance.JournalEntries?.entryDate).isBefore(start)
//       ? start
//       : dayjs(currentBalance.JournalEntries?.entryDate);
//     const validTo = nextDate.isAfter(end) ? end : nextDate;

//     const daysActive = validTo.diff(validFrom, 'day');

//     if (daysActive > 0) {
//       weightedSum += currentBalance.newBalance * daysActive;
//       totalDays += daysActive;
//     }
//   }

//   //* Fall back to current balance if still no transactions recorded

//   return totalDays > 0 ? weightedSum / totalDays : currentBalance;
// }
import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import type { MemberFundsType } from '@/actions/funds/types';

export function calculateADB(
  fundTransactions: MemberFundsType[0]['Transactions'],
  startDate: Dayjs,
  endDate: Dayjs,
  currentBalance: number
): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (fundTransactions.length === 0) {
    return currentBalance;
  }

  let totalDays = 0;
  let weightedSum = 0;

  // Sort transactions by date for accurate processing
  fundTransactions.sort((a, b) => dayjs(a.JournalEntries?.entryDate).diff(dayjs(b.JournalEntries?.entryDate)));

  // Handle the gap before the first transaction
  const firstTransactionDate = dayjs(fundTransactions[0].JournalEntries?.entryDate);
  if (start.isBefore(firstTransactionDate)) {
    const daysBeforeFirstTransaction = firstTransactionDate.diff(start, 'day');
    weightedSum += (fundTransactions[0].newBalance - fundTransactions[0].postedBalance) * daysBeforeFirstTransaction;
    totalDays += daysBeforeFirstTransaction;
  }

  // Process each transaction
  for (let i = 0; i < fundTransactions.length; i++) {
    const transaction = fundTransactions[i];
    const nextDate = fundTransactions[i + 1]
      ? dayjs(fundTransactions[i + 1].JournalEntries?.entryDate)
      : end.add(1, 'day');

    const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
    const validFrom = dayjs.max(transactionDate, start);
    const validTo = dayjs.min(nextDate, end);

    const daysActive = validTo.diff(validFrom, 'day');

    if (daysActive > 0) {
      weightedSum += (transaction.newBalance || 0) * daysActive;
      totalDays += daysActive;
    }
  }

  // Handle the gap after the last transaction until the end date
  const lastTransactionDate = dayjs(fundTransactions[fundTransactions.length - 1].JournalEntries?.entryDate);
  if (end.isAfter(lastTransactionDate)) {
    const daysAfterLastTransaction = end.diff(lastTransactionDate, 'day');
    weightedSum += (fundTransactions[fundTransactions.length - 1].newBalance || 0) * daysAfterLastTransaction;
    totalDays += daysAfterLastTransaction;
  }

  return totalDays > 0 ? weightedSum / totalDays : currentBalance;
}
