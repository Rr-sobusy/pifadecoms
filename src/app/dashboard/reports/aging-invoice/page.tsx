import React from 'react'
import AgingInvoiceTable from '@/components/dashboard/reports/aging-invoice/aging-invoice-table'
import { fetchAgingInvoiceItemsPerMember } from '@/actions/invoices/aging-invoice'
interface PageProps {}

async function page({}: PageProps) {
    const test = await fetchAgingInvoiceItemsPerMember()
  return (
    <AgingInvoiceTable data={test} />
  )
}

export default page