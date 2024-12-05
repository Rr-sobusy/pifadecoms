/**
 * * This function is used to calculate averagae daily balance.
 */
import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import type { MemberFundsType } from '@/actions/funds/types';

export function calculateADB(fundTransactions: MemberFundsType[0]['Transactions'], startDate: Dayjs, endDate: Dayjs, currentBalance:number) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (fundTransactions.length === 0) {
    return currentBalance;
  }

  let totalDays = 0;
  let weightedSum = 0;

  for (let i = 0; i < fundTransactions.length; i++) {
    const currentBalance = fundTransactions[i];
    const nextDate = fundTransactions[i + 1]
      ? dayjs(fundTransactions[i + 1].JournalEntries?.entryDate)
      : end.add(1, 'day'); // Use the end date if it's the last entry

    const validFrom = dayjs(currentBalance.JournalEntries?.entryDate).isBefore(start)
      ? start
      : dayjs(currentBalance.JournalEntries?.entryDate);
    const validTo = nextDate.isAfter(end) ? end : nextDate;

    const daysActive = validTo.diff(validFrom, 'day');

    if (daysActive > 0) {
      weightedSum += currentBalance.newBalance * daysActive;
      totalDays += daysActive;
    }
  }

  //* Fall back to current balance if still no transactions recorded

  return totalDays > 0 ? weightedSum / totalDays : currentBalance;
}
