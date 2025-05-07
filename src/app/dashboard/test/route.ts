// import { stringify } from 'json-bigint';

// import { fetchMonthlyIncomeAndExpense } from '@/actions/overview/fetch-income-expense-by-month-current';
import { fetchDoubleEntryPosted } from '@/actions/reports/account-transactions/fetch-double-entry-posted';
// import { fetchMonthlyNetSurplus } from '@/actions/overview/fetch-monthly-net-surplus';
// import { fetchTopMovingItemInLast30Days } from '@/actions/overview/fetch-top-products';

export async function GET() {
  //   const doublePosted = await fetchDoubleEntryPosted(new Date('2025-01-01'), new Date('2025-01-31'));
  // return new Response(JSON.stringify(doublePosted));

  const doubleEntry = await fetchDoubleEntryPosted(new Date('2025-03-01'), new Date('2025-03-31'))
  return Response.json(doubleEntry)
}
