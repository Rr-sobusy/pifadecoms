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
              { title: 'Contract Type', value: loanDetails?.loanType ?? '' },
              { title: 'Amortization Count', value: loanDetails?.termInMonths ?? 0 },
              { title: 'Interest Rate', value: `${loanDetails?.interestRate ?? 0} %` },
              {
                title: 'Received Amount (Principal)',
                value: formatToCurrency(Number(loanDetails?.amountLoaned) ?? 0, 'Fil-ph', 'Php'),
              },
              {
                title: 'Payable Amount',
                value: formatToCurrency(Number(loanDetails?.amountPayable) ?? 0, 'Fil-ph', 'Php'),
              },
              { title: 'Date Released', value: dayjs(loanDetails?.issueDate).format('MMM DD YYYY') },
            ] satisfies { title: string; value: string | number }[]
          ).map((item) => (
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="body2">
                  {item.title}
                </Typography>
                <div>
                  <Typography color="text.primary" variant="subtitle2">
                    {item.value}
                  </Typography>
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
