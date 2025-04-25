import { fetchDoubleEntryPosted } from "@/actions/reports/account-transactions/fetch-double-entry-posted";


export async function GET() {
    const doublePosted = await fetchDoubleEntryPosted(new Date('2025-01-01'), new Date('2025-01-31'));
  return new Response(JSON.stringify(doublePosted));
}
