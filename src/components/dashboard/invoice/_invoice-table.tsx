'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThreeVertical as Dots } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { type InvoiceType } from '@/actions/invoices/types';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

interface InvoiceTableProps {
  rows: InvoiceType;
}

const dueMonth = 1;

function isPastDue(inputtedDate: Date): boolean {
  return !dayjs(inputtedDate).add(dueMonth, 'M').isSameOrAfter(dayjs(), 'D');
}

function computeInterest(inputtedDate: Date, principalAmout: number, rate: number): number {
  const numberOfMonthsPast = dayjs(inputtedDate).add(dueMonth, 'M').diff(dayjs(), 'M');

  return (rate / 100) * principalAmout * (numberOfMonthsPast - 1) * -1;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        paid: { label: 'Paid', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
        due: { label: 'due', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
      } as const;

      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );

      function getMapping() {
        if (totalBalanceDue !== 0 && isPastDue(row.dateOfInvoice)) return mapping['due'];
        if (totalBalanceDue === 0) return mapping['paid'];
        return mapping['pending'];
      }

      const { label, icon } = getMapping();

      return (
        <Stack
          component={RouterLink}
          direction="row"
          href={paths.dashboard.invoice.details(row.invoiceId)}
          spacing={2}
          sx={{ alignItems: 'center', display: 'inline-flex', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          <div>
            <Stack direction="row" alignItems={`center`} gap={2}>
              <Typography color="text.primary" variant="subtitle2">
                {'INV-' + row.invoiceId.toString().padStart(6, '0')}
              </Typography>
              <Chip icon={icon} label={label} size="small" variant="outlined" />
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {row.Members.lastName + ', ' + row.Members.firstName}
            </Typography>
          </div>
        </Stack>
      );
    },
    name: 'Member Name',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );
      return (
        <div>
          <Typography variant="subtitle2">Base Total</Typography>
          <Typography color="text.secondary" variant="body2">
            {formatToCurrency(totalBalanceDue, 'Fil-ph', 'Php')}
          </Typography>
        </div>
      );
    },
    name: 'Grand Total',
    width: '100px',
  },
  {
    formatter: (row, index): React.JSX.Element => {
      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );
      const totalPaid = row.InvoiceItems.map((invoiceItems)=> ({...invoiceItems, payment: invoiceItems.ItemPayment.reduce((acc,curr)=> acc +(Number(curr.principalPaid)), 0)}))
      return (
        <div>
          <Typography variant="subtitle2">Balance Due</Typography>
          <Typography color="text.secondary" variant="body2">
            {formatToCurrency(totalBalanceDue - totalPaid[index]?.payment || 0, 'Fil-ph', 'Php')}
          </Typography>
        </div>
      );
    },
    name: 'Total balance',
    width: '100px',
  },
  {
    formatter: (row, index): React.JSX.Element => {
      const totalBalanceDue = row.InvoiceItems.reduce(
        (acc, curr) => acc + curr.quantity * (curr.principalPrice + curr.trade),
        0
      );
      const totalPaid = row.InvoiceItems.map((invoiceItems)=> ({...invoiceItems, payment: invoiceItems.ItemPayment.reduce((acc,curr)=> acc +(Number(curr.principalPaid)), 0)}))
      return (
        <div>
          <Typography variant="subtitle2">Intr. accrued(2%)</Typography>
          <Typography color="text.secondary" variant="body2">
            {isPastDue(row.dateOfInvoice) && totalPaid[index].payment !== 0
              ? formatToCurrency(computeInterest(row.dateOfInvoice, totalBalanceDue, 2), 'Fil-ph', 'Php')
              : formatToCurrency(0, 'Fil-ph', 'Php')}
          </Typography>
        </div>
      );
    },
    name: 'Interest Accrued',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Issued</Typography>
        <Typography color="text.secondary" variant="body2">
          {dayjs(row.dateOfInvoice).format('MMM DD YYYY')}
        </Typography>
      </div>
    ),
    name: 'Date Issued',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Due</Typography>
        <Typography color="text.secondary" variant="body2">
          {dayjs(dayjs(row.dateOfInvoice).add(dueMonth, 'M')).format('MMM DD YYYY')}
        </Typography>
      </div>
    ),
    name: 'Total amount',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => {
      // const popover = usePopover<HTMLButtonElement>();
      return (
        <>
          <IconButton>
            <Dots />
          </IconButton>
          {/* <OptionPopOver
            isPaid={row.outStandingAmt === 0}
            invoiceId={row.invoiceId}
            anchorEl={popover.anchorRef.current}
            onClose={popover.handleClose}
            open={popover.open}
          /> */}
        </>
      );
    },
    name: 'Actions',
    width: '10px',
    align: 'right',
  },
] satisfies ColumnDef<InvoiceType[0]>[];

// const OptionPopOver = ({
//   anchorEl,
//   onClose,
//   onMarkAllAsRead,
//   onRemoveOne,
//   open = false,
//   invoiceId,
//   isPaid,
// }: {
//   anchorEl: null | Element;
//   onClose?: () => void;
//   onMarkAllAsRead?: () => void;
//   onRemoveOne?: (id: string) => void;
//   open?: boolean;
//   invoiceId: bigint;
//   isPaid: boolean;
// }): React.JSX.Element => {
//   return (
//     <Popover
//       anchorEl={anchorEl}
//       anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
//       onClose={onClose}
//       open={open}
//       slotProps={{ paper: { sx: { width: '170px' } } }}
//       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//     >
//       <Stack spacing={1} padding={1}>
//         <Button
//           startIcon={<Pay />}
//           disabled={isPaid}
//           size="small"
//           component={RouterLink}
//           href={paths.dashboard.invoice.createPayment(invoiceId)}
//         >
//           Post Payment
//         </Button>
//         <Button
//           LinkComponent={RouterLink}
//           href={paths.dashboard.invoice.details(invoiceId)}
//           startIcon={<Details />}
//           size="small"
//         >
//           Invoice Details
//         </Button>
//       </Stack>
//     </Popover>
//   );
// };

const InvoiceTable = ({ rows }: InvoiceTableProps) => {
  console.log(rows)
  return (
    <Card sx={{ overflowX: 'auto' }}>
      <DataTable<InvoiceType[0]> hover columns={columns} hideHead rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No invoices found
          </Typography>
        </Box>
      ) : null}
    </Card>
  );
};

export default InvoiceTable;
