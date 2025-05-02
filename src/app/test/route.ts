import Decimal from 'decimal.js';
import { stringify } from 'json-bigint';

import { fetchFundLedger } from '@/actions/funds/fetch-fund-ledgers';

export async function GET() {
  try {
    const ledger = await fetchFundLedger(new Date('2025-03-01'), new Date('2025-03-31'));
    return Response.json(stringify(ledger));
  } catch (err) {
    return Response.json({ error: err });
  }
}
