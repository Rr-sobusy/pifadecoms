import React from 'react'
import AgingInvoiceTable from '@/components/dashboard/reports/aging-invoice/aging-invoice-table'
import { fetchAgingInvoiceItemsPerMember } from '@/actions/invoices/aging-invoice'


async function page() {
    const test = await fetchAgingInvoiceItemsPerMember()
  return (
    <AgingInvoiceTable data={test} />
  )
}

export default page