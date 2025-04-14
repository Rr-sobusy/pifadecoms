import React from 'react';
import { Typography } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { ILoanDetails } from '@/actions/loans/types';

import StatusToggler from './loan-stats-toggler';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
}

function LoanDetailsCard({ loanDetails, ...props }: PageProps) {
  return (
    <Card {...props}>
      <CardContent>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Info fontSize="var(--icon-fontSize-md)" />
          <Typography variant="h6">Loan Details</Typography>
        </Stack>
        <Stack marginTop={2} spacing={3}>
          {(
            [
              { title: 'Loaner Name', value: `${loanDetails?.Member.lastName} ${loanDetails?.Member.firstName}` },
              {
                title: 'Loan status',
                value: <StatusToggler isActive={loanDetails.loanStatus === 'Active'} loanId={loanDetails.loanId} />,
              },
              { title: 'Loan Source', value: loanDetails?.Source.sourceName ?? '' },
              { title: 'Loan contract', value: loanDetails?.repStyle ?? '' },
              { title: 'Repayment Interval', value: loanDetails?.repInterval ?? '' },

              { title: 'Amortization Count', value: loanDetails?.paymentQty ?? 0 },
              { title: 'Interest Rate', value: `${loanDetails?.interestRate ?? 0} %` },
              {
                title: 'Loaned Amount (Principal)',
                value: formatToCurrency(Number(loanDetails?.amountLoaned ?? 0), 'Fil-ph', 'Php'),
              },
              {
                title: 'Amount payable',
                value:
                  loanDetails?.repStyle !== 'Diminishing'
                    ? formatToCurrency(Number(loanDetails?.amountPayable ?? 0), 'Fil-ph', 'Php')
                    : `${formatToCurrency(Number(loanDetails?.amountPayable ?? 0), 'Fil-ph', 'Php')} + interest accrued`,
              },
              { title: 'Date Released', value: dayjs(loanDetails?.issueDate).format('MMM DD YYYY') },
              {
                title: 'Due Date',
                value: dayjs(loanDetails?.dueDate).format('MMM DD YYYY'),
              },
              { title: 'Releasing Voucher No.', value: loanDetails?.JournalEntries?.referenceName ?? '' },
            ] satisfies { title: string; value: string | number | React.ReactNode; isLink?: boolean }[]
          ).map((item, index) => (
            <Stack key={index} spacing={2}>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="body2">
                  {item.title}
                </Typography>
                {typeof item.value === 'string' || typeof item.value === 'number' ? (
                  <Typography color="text.primary" variant="subtitle2">
                    {item.value}
                  </Typography>
                ) : (
                  item.value
                )}
              </Stack>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default LoanDetailsCard;
