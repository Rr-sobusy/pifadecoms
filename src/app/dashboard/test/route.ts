import { stringify } from 'json-bigint';

import { fetchMonthlyIncomeAndExpense } from '@/actions/overview/fetch-income-expense-by-month-current';
// import { fetchDoubleEntryPosted } from '@/actions/reports/account-transactions/fetch-double-entry-posted';
import { fetchMonthlyNetSurplus } from '@/actions/overview/fetch-monthly-net-surplus';

export async function GET() {
  //   const doublePosted = await fetchDoubleEntryPosted(new Date('2025-01-01'), new Date('2025-01-31'));
  // return new Response(JSON.stringify(doublePosted));

  const monthlyIncomeExpense = await fetchMonthlyNetSurplus();
  return new Response(stringify(monthlyIncomeExpense));
}
