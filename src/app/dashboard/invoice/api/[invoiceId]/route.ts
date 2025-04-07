/**
 * * Use api route to send data to client component that will be used for rendering invoice data in react-pdf-renderer.
 */

import { stringify } from 'json-bigint';

import { fetchSingleInvoice } from '@/actions/invoices/fetch-invoice';

export async function GET(_: Request, { params }: { params: { invoiceId: number } }) {
  if (params) return new Response(stringify(await fetchSingleInvoice(BigInt(params.invoiceId))));
}
