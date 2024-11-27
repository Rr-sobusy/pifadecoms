'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { SingleInvoiceType } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

export type NonNullableInvoice = Exclude<SingleInvoiceType, null>;

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
        {formatToCurrency(row?.outStandingAmt ?? 0, 'Fil-ph', 'Php')}
      </Typography>
    ),
    name: 'Amount',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Button component={RouterLink} href={paths.dashboard.invoice.details(row.invoiceId)} color="primary">
        {`INV - ${row?.invoiceId.toString().padStart(6, '0')}`}
      </Button>
    ),
    name: 'Invoice ID',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography variant="subtitle2">{dayjs(row.dateOfInvoice).format('MMM DD YYYY')}</Typography>
    ),
    name: 'Invoice Date',
    width: '200px',
  },
] satisfies ColumnDef<NonNullableInvoice>[];

interface BalanceProps {
  invoiceBalance: NonNullableInvoice[];
}

export function Balances({ invoiceBalance = [] }: BalanceProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ShoppingCartSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Invoice Balances"
      />
      <CardContent>
        <Stack spacing={3}>
          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <Stack
              direction="row"
              divider={<Divider flexItem orientation="vertical" />}
              spacing={3}
              sx={{ justifyContent: 'space-between', p: 2 }}
            >
              <div>
                <Typography color="text.secondary" variant="overline">
                  Outstanding Invoices
                </Typography>
                <Typography variant="h6">{invoiceBalance.length}</Typography>
              </div>
              <div>
                <Typography color="text.secondary" variant="overline">
                  Total Outstanding Amount
                </Typography>
                <Typography variant="h6">
                  {formatToCurrency(
                    invoiceBalance.reduce((acc, ctx) => acc + (ctx?.outStandingAmt ?? 0), 0),
                    'Fil-ph',
                    'Php'
                  )}
                </Typography>
              </div>
            </Stack>
          </Card>
          <Card sx={{ borderRadius: 1 }} variant="outlined">
            <Box sx={{ overflowX: 'auto' }}>
              <DataTable columns={columns} rows={invoiceBalance} />
            </Box>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
