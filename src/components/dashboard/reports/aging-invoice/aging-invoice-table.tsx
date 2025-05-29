'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import type { MembersMap } from '@/actions/invoices/aging-invoice';
import { ColumnDef, DataTable } from '@/components/core/data-table';
import { formatToCurrency } from '@/lib/format-currency';

type Props = { data: MembersMap };
type MemberRow = MembersMap[string];

const columns: ColumnDef<MemberRow>[] = [
  {
    name: 'Member Name',
    formatter(row) {
      return row.fullName;
    },
    width: '30%',
  },
  {
    name: 'Invoice Item',
    formatter(row) {
      return (
        <Stack direction="column">
          {row.agingItems.map((item) => (
            <Typography key={item.invoiceItemId.toString()} variant="caption">
              {`${item.quantity} ${item.itemName}  invoiced on ${dayjs(item.dateOfInvoice).format('MMM DD, YYYY')} (${item.monthOverdue} month/s overdue) `}
            </Typography>
          ))}
        </Stack>
      );
    },
    width: '50%',
  },
  {
    name: 'Total Payable (Price + interest)',
    formatter: (row) => {
      let totalPayments = 0;
      let totalPriceAndTrad = 0;
      let totalInterest = 0;

      for (const item of row.agingItems) {
        totalPayments += item.payments.reduce((sum, p) => sum + p.amountPaid, 0);
        totalPriceAndTrad += item.totalPrincipalAndTrade;
        totalInterest += item.accruedInterest;
      }
      return <div>{formatToCurrency((totalPriceAndTrad - totalPayments) + totalInterest)}</div>;
    },
    width: '50%',
  },
];

function AgingInvoiceTable({ data }: Props) {
  const rows: MemberRow[] = Object.entries(data).map(([_, memberData]) => memberData);
  console.log(rows);

  return (
    <Card>
      <DataTable size="small" rows={rows} columns={columns} />
    </Card>
  );
}

export default AgingInvoiceTable;
