import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { InvoiceFilterer } from './_invoice-filters';

interface InvoicesFiltersCardProps {
  filters?: { memberId?: string; endDate?: Date; invoiceId?: number; startDate?: Date; status?: string };
  sortDir?: 'asc' | 'desc';
  view?: 'group' | 'list';
}

export function InvoicesFiltersCard({ filters }: InvoicesFiltersCardProps): React.JSX.Element {
  return (
    <Card
      sx={{ display: { xs: 'none', lg: 'block' }, flex: '0 0 auto', width: '340px', position: 'sticky', top: '80px' }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h5">Filters</Typography>
          <InvoiceFilterer filters={filters} />
        </Stack>
      </CardContent>
    </Card>
  );
}
