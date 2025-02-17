import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';

import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { ILoanDetails } from '@/actions/loans/types';

interface PageProps extends CardProps {
  loanDetails: ILoanDetails;
}

function LoanDetailsCard({ loanDetails, ...props }: PageProps) {
  const interest = (amount: number, rate: number, term: number): number => {
    return amount * (rate / 100) * term;
  };

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
              { title: 'Contract Type', value: loanDetails?.loanType ?? '' },
              { title: 'Loan Source', value: loanDetails?.Source.sourceName ?? '' },
              { title: 'Amortization Count', value: loanDetails?.termInMonths ?? 0 },
              { title: 'Interest Rate', value: `${loanDetails?.interestRate ?? 0} %` },
              {
                title: 'Received Amount (Principal)',
                value: formatToCurrency(Number(loanDetails?.amountLoaned ?? 0), 'Fil-ph', 'Php'),
              },
              {
                title: 'Interest computed',
                value: `${formatToCurrency(interest(Number(loanDetails?.amountLoaned), Number(loanDetails?.interestRate), loanDetails?.termInMonths ?? 0), 'Fil-ph', 'Php')} in ${loanDetails?.termInMonths} months`,
              },
              {
                title: 'Payable Amount',
                value: formatToCurrency(Number(loanDetails?.amountPayable ?? 0), 'Fil-ph', 'Php'),
              },
              { title: 'Date Released', value: dayjs(loanDetails?.issueDate).format('MMM DD YYYY') },
              {
                title: 'Due Date',
                value: dayjs(loanDetails?.Repayments[loanDetails?.Repayments.length - 1].paymentSched).format(
                  'MMM DD YYYY'
                ),
              },
              { title: 'Journal Entry', value: Number(loanDetails?.JournalEntries?.entryId ?? 0), isLink: true },
            ] satisfies { title: string; value: string | number; isLink?: boolean }[]
          ).map((item, index) => (
            <Stack key={index} spacing={2}>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="body2">
                  {item.title}
                </Typography>
                <div>
                  {!item.isLink ? (
                    <Typography color="text.primary" variant="subtitle2">
                      {item.value}
                    </Typography>
                  ) : (
                    <Button LinkComponent={Link} variant="text">
                      Journal Entry
                    </Button>
                  )}
                </div>
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
