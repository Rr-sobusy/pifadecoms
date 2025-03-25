import { stringify } from 'json-bigint';

import { fetchLoanDetails } from '@/actions/loans/fetch-loans';

export async function GET(_: Request, { params }: { params: { loanId: number } }) {
  if (params) return new Response(stringify(await fetchLoanDetails(BigInt(params.loanId))));
  return null;
}
